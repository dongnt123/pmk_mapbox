import { CheckCircledIcon } from "@radix-ui/react-icons";

const FormSuccess = ({ message }: { message?: string }) => {

  if (!message) return (<></>)

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-small text-emerald-500 border border-emerald-500">
      <CheckCircledIcon className="w-4 h-4" />
      <p className="text-base">{message}</p>
    </div>
  )
}

export default FormSuccess