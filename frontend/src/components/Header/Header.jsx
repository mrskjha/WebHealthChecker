import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const navListMenuItems = [
  {
    title: "Add Users",
    description: "Add users to the monitoring system.",
    icon: ChartBarIcon,
    link: "/userdataform",
  },
  {
    title: "Alerts",
    description: "Manage and review system alerts.",
    icon: BellIcon,
    link: "/alerts",
  },
  {
    title: "Settings",
    description: "Configure monitoring preferences.",
    icon: Cog6ToothIcon,
    link: "/settings",
  },
];

function handleLogout() {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("token");
  window.location.href = "/login";
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg bg-gray-100 p-2">
            {React.createElement(icon, {
              className: "h-6 w-6 text-blue-600",
            })}
          </div>
          <div>
            <Typography variant="h6" className="text-sm font-bold">
              {title}
            </Typography>
            <Typography className="text-xs text-gray-500">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Typography
          as="div"
          variant="small"
          className="cursor-pointer font-medium"
        >
          <ListItem
            className="flex items-center gap-2 py-2 pr-4"
            selected={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Features
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className="rounded-lg">
        <ul className="grid gap-y-2">{renderItems}</ul>
      </MenuList>
    </Menu>
  );
}

function NavList() {
  return (
    <List className="flex flex-col gap-4 lg:flex-row">
      <Typography as={Link} to="/" className="font-medium">
        <ListItem className="py-2">Home</ListItem>
      </Typography>
      <Typography as={Link} to="/dashboard" className="font-medium">
        <ListItem className="py-2">Dashboard</ListItem>
      </Typography>
      <NavListMenu />
      <Typography as={Link} to="/contact" className="font-medium">
        <ListItem className="py-2">Contact</ListItem>
      </Typography>
    </List>
  );
}

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    });
  }, []);

  return (
    <Navbar className="mx-auto max-w-7xl px-4 py-2">
      <div className="flex items-center justify-between">
        <Typography
          as={Link}
          to="/"
          variant="h5"
          className="font-bold text-black"
        >
          Site Monitor
        </Typography>
        <div className="hidden lg:flex">
          <NavList />
        </div>
        <div className="hidden lg:flex gap-2">
          {localStorage.getItem("isAuthenticated") ? (
            <Button variant="gradient" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outlined" size="sm">
                Log In
              </Button>
            </Link>
          )}
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex flex-col gap-2 lg:hidden">
          {localStorage.getItem("isAuthenticated") ? (
            <Button variant="gradient" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outlined" size="sm">
                Log In
              </Button>
            </Link>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
