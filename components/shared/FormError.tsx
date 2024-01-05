import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const FormError = ({ message }: { message?: string }) => {

  if (!message) return (<></>)

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-small text-destructive border border-destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p className="text-base">{message}</p>
    </div>
  )
}

export default FormError