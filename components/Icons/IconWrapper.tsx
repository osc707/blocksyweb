import { IconProps } from '.'

const IconWrapper = ({ modClass, children }: IconProps): JSX.Element => (
  <span className={`icon ${modClass}`}>
    {children}
  </span>
);

export default IconWrapper;