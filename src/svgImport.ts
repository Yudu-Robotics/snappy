const logo = "/assets/Logo.svg";
const google = "/assets/auth/google.svg";
const signuptag = "/assets/auth/signuptag.svg";
const smile = "/assets/auth/smile.svg";
const signuppagezigzag = "/assets/auth/signuppagezigzag.svg";
const mail = "/assets/auth/mail.svg";
const logintag = "/assets/auth/logintag.svg";

//Forgot
const forgotkey = "/assets/forgot/forgotkey.svg";
const backbutton = "/assets/forgot/backbutton.svg";
const bgimage = "/assets/forgot/bgimage.svg";
const emailicon = "/assets/forgot/emailicon.svg";
const lock = "/assets/forgot/lock.svg";
const success = "/assets/forgot/success.svg";

//profileselection
const person = "/assets/profileselection/person.svg";
const school = "/assets/profileselection/school.svg";
const redstar = "/assets/profileselection/redstar.svg";
const greenstar = "/assets/profileselection/greenstar.svg";
const plusicon = "/assets/profileselection/plusicon.svg";
const blackPlusIcon = "/assets/profileselection/blackPlusIcon.svg";
const fullscreen = "/assets/profileselection/fullscreen.svg";
const closefullscreen = "/assets/profileselection/closefullscreen.svg";
const eye = "/assets/profileselection/eye.svg";
const colorPicker = "/assets/profileselection/colorPicker.png";
const next = "/assets/profileselection/next.svg";
const previous = "/assets/profileselection/previous.svg";
const type = "/assets/profileselection/type.svg";
const editicon = "/assets/profileselection/editicon.svg";

//navbar
const bell = "/assets/navbar/bell.svg";
const setting = "/assets/navbar/setting.svg";
const search = "/assets/navbar/search.svg";

//Footer
const mobile1 = "/assets/footer/mobile1.svg";
const mobile2 = "/assets/footer/mobile2.svg";
const facebook = "/assets/footer/facebook.svg";
const x = "/assets/footer/x.svg";
const linkedln = "/assets/footer/in.svg";

//Profile
const homeIcon = "/assets/profile/home.svg";
const rightarrow = "/assets/profile/rightarrow.svg";
const building = "/assets/profile/building.svg";
const trash = "/assets/profile/trash.svg";
const mobileIcon = "/assets/profile/mobileIcon.svg";
const monitor = "/assets/profile/monitor.svg";
const upload = "/assets/profile/upload.svg";
const user = "/assets/profile/user.svg";
const close = "/assets/profile/close.svg";
const confirm = "/assets/profile/confirm.svg";

//Dashboard
const arrow = "/assets/dashboard/arrow.svg";
const whitearrow = "/assets/dashboard/whitearrow.svg";
const multiplestar = "/assets/dashboard/multiplestar.svg";
const closeIcon = "/assets/dashboard/closeIcon.svg";

//classroom
const edit = "/assets/classroom/edit.svg";
const share = "/assets/classroom/share.svg";
const filter = "/assets/classroom/filter.svg";
const clipboard = "/assets/classroom/clipboard.svg";
const fev = "/assets/classroom/fev.svg";
const openbook = "/assets/classroom/openbook.svg";
const people = "/assets/classroom/people.svg";
const watch = "/assets/classroom/watch.svg";
const fileplus = "/assets/classroom/fileplus.svg";
const msg = "/assets/classroom/msg.svg";
const redirect = "/assets/classroom/redirect.svg";
const upload1 = "/assets/classroom/upload1.svg";

//course
const milestone = "/assets/course/milestone.svg";
const quicktest = "/assets/course/quicktest.svg";
const generate = "/assets/course/generate.svg";
const publish = "/assets/course/publish.svg";
const add = "/assets/course/add.svg";

// Alert
const bluewarning = "/assets/alert/bluewarning.svg";
const greywarning = "/assets/alert/greywarning.svg";
const redwarning = "/assets/alert/redwarning.svg";
const cross = "/assets/alert/cross.svg";
const greenwarning = "/assets/alert/greenwarning.svg";

const tick = "/assets/school/tick.svg";

const menu = "/assets/header/menu.svg";
const messages = "/assets/header/messages.svg";
const dashboard = "/assets/header/dashboard.svg";
const dropdown = "/assets/header/dropdown.svg";
const events = "/assets/header/events.svg";
const logout = "/assets/header/logout.svg";
const support = "/assets/header/support.svg";
const clubs = "/assets/header/clubs.svg";
const courses = "/assets/header/courses.svg";
const settings = "/assets/header/settings.svg";

const bg = "/assets/header/bg.svg";
function renderSvg(svgName: string): string {
  switch (svgName) {
    case "bg":
      return bg;
    //Auth
    case "logo":
      return logo;
    case "google":
      return google;
    case "signuptag":
      return signuptag;
    case "smile":
      return smile;
    case "signuppagezigzag":
      return signuppagezigzag;
    case "mail":
      return mail;
    case "logintag":
      return logintag;

    //Forgot
    case "forgotkey":
      return forgotkey;
    case "backbutton":
      return backbutton;
    case "bgimage":
      return bgimage;
    case "emailicon":
      return emailicon;
    case "lock":
      return lock;
    case "success":
      return success;

    //profile Selction
    case "person":
      return person;
    case "school":
      return school;
    case "redstar":
      return redstar;
    case "greenstar":
      return greenstar;
    case "plusicon":
      return plusicon;
    case "blackPlusIcon":
      return blackPlusIcon;
    case "fullscreen":
      return fullscreen;
    case "closefullscreen":
      return closefullscreen;
    case "eye":
      return eye;

    //Navbar
    case "bell":
      return bell;
    case "setting":
      return setting;
    case "search":
      return search;

    //footer
    case "mobile1":
      return mobile1;
    case "mobile2":
      return mobile2;
    case "facebook":
      return facebook;
    case "in":
      return linkedln;
    case "x":
      return x;

    //Profile
    case "homeIcon":
      return homeIcon;
    case "rightarrow":
      return rightarrow;
    case "building":
      return building;
    case "trash":
      return trash;
    case "mobileIcon":
      return mobileIcon;
    case "monitor":
      return monitor;
    case "upload":
      return upload;
    case "user":
      return user;
    //Dashboard
    case "arrow":
      return arrow;
    case "whitearrow":
      return whitearrow;
    case "multiplestar":
      return multiplestar;
    case "closeIcon":
      return closeIcon;
    case "close":
      return close;
    case "confirm":
      return confirm;
    //classroom
    case "edit":
      return edit;
    case "share":
      return share;
    case "filter":
      return filter;
    case "clipboard":
      return clipboard;
    case "fev":
      return fev;
    case "openbook":
      return openbook;
    case "people":
      return people;
    case "watch":
      return watch;
    case "fileplus":
      return fileplus;
    case "msg":
      return msg;
    case "redirect":
      return redirect;
    case "upload1":
      return upload1;

    //Course
    case "milestone":
      return milestone;
    case "quicktest":
      return quicktest;
    case "generate":
      return generate;
    case "publish":
      return publish;
    case "add":
      return add;
    case "editicon":
      return editicon;

    //Alert
    case "bluewarning":
      return bluewarning;
    case "greywarning":
      return greywarning;
    case "redwarning":
      return redwarning;
    case "greenwarning":
      return greenwarning;
    case "cross":
      return cross;
    case "tick":
      return tick;
    case "menu":
      return menu;
    case "messages":
      return messages;
    case "dashboard":
      return dashboard;
    case "dropdown":
      return dropdown;
    case "events":
      return events;
    case "logout":
      return logout;
    case "support":
      return support;
    case "clubs":
      return clubs;
    case "courses":
      return courses;
    case "settings":
      return settings;
    case "colorPicker":
      return colorPicker;
    case "next":
      return next;
    case "previous":
      return previous;
    case "type":
      return type;

    default:
      return logo;
  }
}

export default renderSvg;
