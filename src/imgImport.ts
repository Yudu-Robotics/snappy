const login = "/assets/auth/login.png";
const login2 = "/assets/auth/login2.png";
const login3 = "/assets/auth/login3.png";
const signin = "/assets/auth/signin.png";
const signin2 = "/assets/auth/signin2.png";
const star = "/assets/auth/star.png";
const profilepic = "/assets/profile/profilepic.png";
const headerBanner = "/assets/dashboard/headerBanner.png";
const roboticsBanner = "/assets/dashboard/roboticsBanner.png";
const courseCard = "/assets/dashboard/CourseCard.png";
const eventCard = "/assets/dashboard/EventsCard.png";
const noStats = "/assets/dashboard/NoStats.png";
const notcourse = "/assets/dashboard/notcourse.png";
const zingbanner = "/assets/dashboard/zingbanner.png";
const warningBackground = "/assets/common_images/warningBackground.png";
//Classroom
const banner = "/assets/classroom/banner.png";
const temp = "/assets/classroom/temp.png";
const course = "/assets/classroom/course.png";
const aep = "/assets/classroom/aep.png";
const docx = "/assets/classroom/docx.png";
const fig = "/assets/classroom/fig.png";
const pdf = "/assets/classroom/pdf.png";
const jpg = "/assets/classroom/jpg.png";
const mp3 = "/assets/classroom/mp3.png";
const mp4 = "/assets/classroom/mp4.png";
const img = "/assets/classroom/img.png";
const noclassroom = "/assets/classroom/noclassroom.png";

//Course
const nocontent = "/assets/course/Content.png";
const switch_vertical = "/assets/course/switch-vertical.png";
const nopartners = "/assets/course/nopartnes.png";

//test
const playIcon = "/assets/QuickTest/play.png";
const stopIcon = "/assets/QuickTest/icon-stop.png";
const pauseIcon = "/assets/QuickTest/pause.png";
const timerIcon = "/assets/QuickTest/icon-timer.png";
const redTimerIcon = "/assets/QuickTest/red-timer.png";
const closeIcon = "/assets/QuickTest/icon-close.png";

const checkbox = "/assets/partners/icons/checkbox.png";
const school = "/assets/school/school.png";
const tick = "/assets/partners/icons/tick.png";
const tickbg = "/assets/partners/icons/tick_background.png";

const settings = "/assets/profile/settings.png";
const logout = "/assets/profile/logout.png";
const profile = "/assets/profile/profile.png";
const history = "/assets/profile/history.png";
const electric = "/assets/profile/electric.png";

const copy = "/assets/school/copy.png";

const legend = "/assets/course/legend.png";
const master = "/assets/course/master.png";
const expert = "/assets/course/expert.png";
const specialist = "/assets/course/specialist.png";
const adept = "/assets/course/adept.png";
const explorer = "/assets/course/explorer.png";
const novice = "/assets/course/novice.png";
const courseDown = "/assets/course/down.png";
const courseUp = "/assets/course/up.png";

// School Icons
const analytics = "/assets/school/analytics.png";
const print = "/assets/school/print.png";
const view = "/assets/school/view.png";

const notfound = "/assets/header/404.png";

const notcompatible = "/assets/course/not-compatible.png";

const background = "/assets/forgot/bgimage.svg";

//profileselection
const connector = "/assets/profileselection/connector.png";
const remote = "/assets/profileselection/remote.png";
const dotgrid = "/assets/profileselection/dotgrid.png";
const remoteA = "/assets/profileselection/remoteA.png";
const receiverA = "/assets/profileselection/receiverA.png";
const youtube = "/assets/profileselection/youtube.png";
const Aplus = "/assets/profileselection/Aplus.png";
const Aminus = "/assets/profileselection/Aminus.png";

function renderImg(imgName: string): string {
  switch (imgName) {
    case "notcompatible":
      return notcompatible;
    case "background":
      return background;
    case "login":
      return login;
    case "star":
      return star;
    case "login2":
      return login2;
    case "login3":
      return login3;
    case "signin":
      return signin;
    case "signin2":
      return signin2;
    case "profilepic":
      return profilepic;
    case "headerBanner":
      return headerBanner;
    case "roboticsBanner":
      return roboticsBanner;
    case "courseCard":
      return courseCard;
    case "eventCard":
      return eventCard;
    case "noStats":
      return noStats;
    case "zingbanner":
      return zingbanner;
    case "notcourse":
      return notcourse;
    case "warningBackground":
      return warningBackground;
    case "notfound":
      return notfound;
    //Classroom
    case "banner":
      return banner;
    case "temp":
      return temp;
    case "course":
      return course;
    case "aep":
      return aep;
    case "docx":
      return docx;
    case "fig":
      return fig;
    case "pdf":
      return pdf;
    case "jpg":
      return jpg;
    case "mp3":
      return mp3;
    case "mp4":
      return mp4;
    case "img":
      return img;
    case "noclassroom":
      return noclassroom;

    //Course
    case "nocontent":
      return nocontent;
    case "switch_vertical":
      return switch_vertical;
    case "nopartners":
      return nopartners;
    //quick test
    case "playIcon":
      return playIcon;
    case "stopIcon":
      return stopIcon;
    case "timerIcon":
      return timerIcon;
    case "pauseIcon":
      return pauseIcon;
    case "redTimerIcon":
      return redTimerIcon;
    case "closeIcon":
      return closeIcon;

    case "checkbox":
      return checkbox;
    case "school":
      return school;

    case "tick":
      return tick;

    case "tickbg":
      return tickbg;

    case "settings":
      return settings;
    case "logout":
      return logout;
    case "profile":
      return profile;
    case "history":
      return history;
    case "electric":
      return electric;
    case "copy":
      return copy;

    case "legend":
      return legend;
    case "master":
      return master;
    case "expert":
      return expert;
    case "specialist":
      return specialist;
    case "adept":
      return adept;
    case "explorer":
      return explorer;
    case "novice":
      return novice;
    case "courseDown":
      return courseDown;
    case "courseUp":
      return courseUp;
    case "analytics":
      return analytics;
    case "print":
      return print;
    case "view":
      return view;

    //profileselection
    case "connector":
      return connector;
    case "remote":
      return remote;
    case "dotgrid":
      return dotgrid;
    case "remoteA":
      return remoteA;
    case "receiverA":
      return receiverA;
    case "youtube":
      return youtube;
    case "Aplus":
      return Aplus;
    case "Aminus":
      return Aminus;

    default:
      return img;
  }
}

export default renderImg;
