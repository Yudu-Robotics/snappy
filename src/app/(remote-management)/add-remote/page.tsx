// @ts-nocheck
"use client";
import init, { decrypt } from "snappy-remote";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOS } from "@/utils/getPlatform";
import renderImg from "@/imgImport";
import renderSvg from "@/svgImport";
import {
  addDevice,
  addReceiver,
  addRemote,
  deleteRemote,
  updateReceiverName,
  updateRemoteName,
} from "@/app/redux/feature/remoteSlice/remoteSlice";
import { useRouter } from "next/navigation";

interface Remote {
  remote_name: string;
  remote_id: string;
}

interface Receiver {
  receiverName: string;
  receiverID: string;
  remotes: Remote[];
}

interface RootState {
  remote: {
    receivers: Receiver[];
  };
}

interface ScanConnectorProps {}

const ScanConnector: React.FC<ScanConnectorProps> = () => {
  const dispatch = useDispatch();
  const receivers = useSelector((state: RootState) => state.remote.receivers);
  const data = useSelector((state: RootState) => state.remote);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [studentRemotes, setStudentRemotes] = useState<Remote[]>([]);
  const [editingRemoteId, setEditingRemoteId] = useState<string | null>(null);
  const [summary, setSummary] = useState<boolean>(true);
  const [showReceiver, setShowReceiver] = useState<boolean>(false);
  const [showRemote, setShowRemote] = useState<boolean>(false);
  const [tempRemoteName, setTempRemoteName] = useState<string>("");
  const platform = getOS();
  const router = useRouter();

  useEffect(() => {
    async function initialize() {
      await init();
    }
    initialize();
  }, []);

  async function sendCommandAndListen(device: any) {
    try {
      await device.open();
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }
      await device.claimInterface(1);
      dispatch(addDevice(device));
      console.log(device);

      // Store serializable device info in localStorage
      localStorage.setItem(
        "currentDeviceInfo",
        JSON.stringify({
          serialNumber: device.serialNumber,
          vendorId: device.vendorId,
          productId: device.productId,
        })
      );

      setVendorId(device.vendorId);
      const command = new TextEncoder().encode("START\n");
      const descriptorIndex = device.serialNumber ? 0 : 3;
      const result = await device.controlTransferIn(
        {
          requestType: "standard",
          recipient: "device",
          request: 0x06,
          value: (0x03 << 8) | descriptorIndex,
          index: 0x0409,
        },
        255
      );
      let serial_number = [];
      if (platform === "windows") {
        const serialKey = new Uint8Array(result.data.buffer);
        for (let i = 2; i < serialKey.length; i += 2) {
          serial_number.push(serialKey[i]);
        }
      } else {
        const serialNumber = device.serialNumber || "";
        serial_number = [...serialNumber].map((char) => char.charCodeAt(0));
      }
      await device.transferOut(2, command);
      setShowReceiver(true);

      while (true) {
        const result = await device.transferIn(2, 64);
        if (result.status === "ok") {
          const int8Array = new Uint8Array(result.data.buffer);
          if (int8Array.length === 17) {
            const data = new Uint8Array([...int8Array.slice(0, 17)]);
            const answer = decrypt(serial_number, data);
            if (typeof answer === "string" && answer.trim().startsWith("{")) {
              try {
                const jsonData = JSON.parse(answer);
                setStudentRemotes((prev) => {
                  if (
                    prev.some((remote) => remote.remote_id === jsonData?.MAC)
                  ) {
                    return prev;
                  }
                  return [
                    ...prev,
                    {
                      remote_name: "",
                      remote_id: jsonData?.MAC,
                    },
                  ];
                });
              } catch (parseError) {
                console.error("JSON parse error:", parseError);
              }
            }
          }
        } else {
          console.log("Transfer error:", result.status);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  const handleScanAndConnect = async () => {
    setIsConnecting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      if (!("usb" in navigator)) {
        throw new Error("Web USB API is not supported in this browser.");
      }
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0xb1b0, productId: 0x8055 }],
      });
      await sendCommandAndListen(device);
    } catch (error) {
      setError("Failed to connect to the receiver. Please try again.");
      console.log("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmName = () => {
    if (customName.trim() && receiverId) {
      dispatch(
        updateReceiverName({ receiverID: receiverId, receiverName: customName })
      );
      setIsEditing(false);
    }
  };

  const handleEditRemoteClick = (remote_id: string, currentName: string) => {
    setEditingRemoteId(remote_id);
    setTempRemoteName(currentName);
  };

  const handleConfirmRemoteName = (remote_id: string) => {
    if (tempRemoteName.trim() && receiverId) {
      dispatch(
        updateRemoteName({
          receiverID: receiverId,
          remote_id,
          remote_name: tempRemoteName.trim(),
        })
      );
      setStudentRemotes((prev) =>
        prev.map((remote) =>
          remote.remote_id === remote_id
            ? { ...remote, remote_name: tempRemoteName.trim() }
            : remote
        )
      );
      setEditingRemoteId(null);
      setTempRemoteName("");
    }
  };

  const handleDeleteRemote = (remote_id: string) => {
    if (receiverId) {
      dispatch(deleteRemote({ receiverID: receiverId, remote_id }));
      setStudentRemotes((prev) =>
        prev.filter((remote) => remote.remote_id !== remote_id)
      );
    }
  };

  const receiverHandler = () => {
    try {
      const newReceiverID = new Date().toISOString();
      dispatch(
        addReceiver({
          receiverName: customName || "Unnamed Receiver",
          receiverID: newReceiverID,
        })
      );
      setReceiverId(newReceiverID);
      setShowRemote(true);
      setShowReceiver(false);
      setSuccessMessage("Receiver created successfully!");
      setError(null);
    } catch (error) {
      console.log("Error creating receiver:", error);
      setError("Failed to create receiver. Please try again.");
      setSuccessMessage(null);
    }
  };

  const addRemoteHandler = () => {
    if (!receiverId) {
      setError("Receiver ID is missing.");
      return;
    }
    try {
      const currentReceiver = receivers.find(
        (r) => r.receiverID === receiverId
      );
      const existingRemoteIds = new Set(
        currentReceiver?.remotes.map((remote) => remote.remote_id) || []
      );

      const uniqueRemotes = studentRemotes.filter(
        (remote) => !existingRemoteIds.has(remote.remote_id)
      );

      setStudentRemotes((prev) => {
        const prevRemoteIds = new Set(prev.map((r) => r.remote_id));
        return [
          ...prev,
          ...uniqueRemotes.filter((r) => !prevRemoteIds.has(r.remote_id)),
        ];
      });

      uniqueRemotes.forEach((remote, index) => {
        dispatch(
          addRemote({
            receiverID: receiverId,
            remote: {
              remote_name: remote.remote_name || `Remote ${index + 1}`,
              remote_id: remote.remote_id,
            },
          })
        );
      });

      if (uniqueRemotes.length === 0 && studentRemotes.length > 0) {
        setError("All remotes are already added.");
        return;
      }

      setSuccessMessage("Remotes added successfully!");
      router.push("/");
      setError(null);
    } catch (error) {
      console.log("Error adding remotes:", error);
      setError("Failed to add remotes. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-[100vh] bg-[#E3E3E4] bg-opacity-100 z-50 font-tthoves-medium">
      {error && <div className="text-red-500 mt-2 z-20">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-2 z-20">{successMessage}</div>
      )}
      <div className="absolute z-0">
        <img src={renderImg("dotgrid")} alt="Background grid" />
      </div>
      {summary ? (
        <div className="z-20">
          <div className="w-full flex flex-col justify-center items-center mb-10">
            <div className="text-[#4A4A4F] font-tthoves-semiBold">
              Instructions
            </div>
            <div className="text-[#0A0A0A] font-tthoves-semiBold">
              Start by connecting the receiver
            </div>
            <div className="text-[#0A0A0A] font-tthoves text-sm">
              Note: Ensure the receiver is properly connected.
            </div>
          </div>
          <div className="flex gap-10 z-20">
            <div className="flex flex-col">
              <div
                onClick={() => {
                  if (vendorId) {
                    setShowReceiver(!showReceiver);
                    setShowRemote(true);
                  }
                }}
              >
                <img
                  src={renderImg("connector")}
                  alt="Receiver"
                  className={`${showReceiver ? "w-20 h-20" : ""}`}
                />
              </div>
              {!vendorId && (
                <button
                  className={`bg-[#5423E6] hover:bg-[#4338CA] text-nowrap rounded-2xl px-2 sm:px-4 py-2 text-[#FDFDFE] cursor-pointer font-tthoves-semiBold flex justify-center items-center align-middle ${
                    isConnecting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleScanAndConnect}
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Scan & Connect"}
                </button>
              )}
            </div>
            <div>
              {showReceiver && (
                <div className="flex flex-col my-2 bg-white rounded-2xl p-4 shadow-md w-[350px] text-black">
                  <div className="text-[#4A4A4F] font-tthoves-semiBold py-2">
                    Available Receiver
                  </div>
                  <div className="font-tthoves-medium py-2 text-black">
                    Vendor Id :- {vendorId}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <div className="flex items-center gap-2">
                        {customName || "Unnamed Receiver"}
                        <img
                          src={renderSvg("edit")}
                          alt="Edit icon"
                          className="cursor-pointer"
                          onClick={handleEditClick}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Write custom name"
                        className="border border-gray-400 rounded px-2 py-1"
                        autoFocus
                      />
                    )}
                    {isEditing && customName.trim() && (
                      <button
                        onClick={handleConfirmName}
                        className="text-[#5423E6] rounded-xl flex items-center justify-center font-tthoves-bold text-xs border-2 border-[#4c29b4] px-2 py-1"
                      >
                        Save
                      </button>
                    )}
                  </div>
                  <button
                    className="bg-[#5423E6] hover:bg-[#4338CA] text-nowrap rounded-2xl px-2 sm:px-4 py-2 text-[#FDFDFE] cursor-pointer font-tthoves-semiBold flex justify-center items-center align-middle mt-5 mb-2"
                    onClick={receiverHandler}
                  >
                    Save Receiver
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div>
                <img
                  src={renderImg("remote")}
                  alt="Remote"
                  className={`${showRemote ? "w-20 h-20" : ""}`}
                />
              </div>
            </div>
            {showRemote && (
              <div className="bg-white rounded-2xl px-4 py-4 flex flex-col justify-between w-[500px] gap-4 shadow-md h-[500px] overflow-y-auto">
                <div className="text-[#4A4A4F] font-tthoves-semiBold">
                  Available Remotes
                </div>
                {studentRemotes.length === 0 && (
                  <div className="font-tthoves-medium">
                    <div>Please Press Any Button of Remotes</div>
                    <div className="text-sm">
                      Note :- First remote for teacher only
                    </div>
                  </div>
                )}
                <div className="flex flex-col flex-1">
                  {studentRemotes.map((remote, index) => (
                    <div
                      key={remote.remote_id}
                      className="bg-white rounded-2xl px-4 py-2 flex flex-col justify-between gap-4 text-[#0A0A0A] font-tthoves-regular"
                    >
                      {index === 0 && (
                        <div className="flex-none font-tthoves-semiBold text-[#5423E6]">
                          Teacher remotes
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex-none font-tthoves-semiBold text-[#5423E6]">
                          Student remotes
                        </div>
                      )}
                      <div className="flex items-center gap-2 justify-between">
                        {editingRemoteId === remote.remote_id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tempRemoteName}
                              onChange={(e) =>
                                setTempRemoteName(e.target.value)
                              }
                              placeholder="Enter remote name"
                              className="border border-gray-400 rounded px-2 py-1"
                              autoFocus
                            />
                            {tempRemoteName.trim() && (
                              <button
                                onClick={() =>
                                  handleConfirmRemoteName(remote.remote_id)
                                }
                                className="text-[#5423E6] rounded-xl flex items-center justify-center font-tthoves-bold text-xs border-2 border-[#4c29b4] px-2 py-1"
                              >
                                Save
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div>{remote.remote_name || "Unnamed Remote"}</div>
                            <img
                              src={renderSvg("edit")}
                              alt="Edit icon"
                              className="cursor-pointer"
                              onClick={() =>
                                handleEditRemoteClick(
                                  remote.remote_id,
                                  remote.remote_name
                                )
                              }
                            />
                          </div>
                        )}
                        <img
                          src={renderSvg("trash")}
                          alt="Delete icon"
                          className="cursor-pointer"
                          onClick={() => handleDeleteRemote(remote.remote_id)}
                        />
                      </div>
                      <div>MAC ID:- {remote.remote_id}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSummary(false)}
                  className="bg-[#5423E6] hover:bg-[#4338CA] text-nowrap rounded-2xl px-2 sm:px-4 py-2 text-[#FDFDFE] cursor-pointer font-tthoves-semiBold flex justify-center items-center align-middle"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="z-20">
          <div className="w-[500px] h-[350px] bg-[#FDFDFE] p-5 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center gap-2">
              <div className="text-[#0A0A0A] font-tthoves-semiBold">
                Your Device
              </div>
              <div
                onClick={() => setSummary(!summary)}
                className="cursor-pointer"
              >
                <img src={renderSvg("cross")} alt="Cross icon" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-5">
              <div className="flex items-center gap-2">
                <div className="flex mt-2">
                  <img
                    src={renderImg("receiverA")}
                    alt="Check icon"
                    className="w-20 h-20"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div>{customName || "Name"}</div>
                  <div>{vendorId || "Not Connected"}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="flex mt-2">
                  <img
                    src={renderImg("remoteA")}
                    alt="Check icon"
                    className="w-20 h-20"
                  />
                </div>
                <div>
                  <div>{studentRemotes.length || "0"}</div>
                  <div>Remotes Added</div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2 mt-5">
              <div
                onClick={() => setSummary(!summary)}
                className="bg-[#E3E3E4] w-full hover:bg-[#D1D5DB] text-nowrap rounded-2xl px-2 sm:px-4 py-2 text-[#0A0A0A] cursor-pointer font-tthoves-semiBold flex justify-center items-center align-middle"
              >
                Add Device
              </div>
              <div
                className="bg-[#5423E6] w-full hover:bg-[#4338CA] text-nowrap rounded-2xl px-2 sm:px-4 py-2 text-[#FDFDFE] cursor-pointer font-tthoves-semiBold flex justify-center items-center align-middle"
                onClick={addRemoteHandler}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanConnector;
