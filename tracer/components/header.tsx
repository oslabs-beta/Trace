type Props = {
  size: string; // lg, md, sm
  text: string;
}

const Header = ({ size, text }: Props) => {
  // switch statement 
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

export default Header;