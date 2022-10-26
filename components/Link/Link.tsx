import NextLink from 'next/link'

export const Link: React.FC<React.AnchorHTMLAttributes<any>> = ({
  href,
  children,
  ...props
}) => {
  // console.log('link ', href, props)
  return (
      <a className="custom-component-name-2" {...props}>{children}</a>

  )
}
