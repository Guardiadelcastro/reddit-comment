import * as React from 'react'

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>

function Button({ children, ...rest }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-1 px-4 py-1 text-xs font-semibold  rounded-full text-white bg-blue-500 transition-colors duration-100 ease-in hover:bg-blue-600 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-orange-500 disabled:bg-gray-400 "
      {...rest}
    >
      {children}
    </button>
  )
}

type LightButtonProps = ButtonProps & {
  square?: boolean
}

function LightButton({
  children,
  square = false,
  ...rest
}: LightButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-1  text-xs font-semibold text-gray-500 bg-transparent transition-colors duration-100 ease-in hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:bg-gray-200 focus:text-gray-900 focus:ring focus:ring-orange-500 focus:ring-offset-1 ${
        square ? 'p-1' : 'px-4 py-1'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export { Button, LightButton }
