import FileResources from "views/FileResources";

const dashboardRoutes = [
  {
    path: "/files",
    name: "File Resources",
    icon: "nc-icon nc-money-coins",
    component: FileResources,
    layout: "/admin"
  }
];

export default dashboardRoutes;