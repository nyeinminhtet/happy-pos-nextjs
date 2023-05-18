import MenuAppBar from "./AppBar";

type Props = {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  return (
    <div>
      <MenuAppBar title={props.title} />
      {props.children}
    </div>
  );
};

export default Layout;
