import Loading from './Loading';
import Button from './Button';

interface ErrorProps {
    message: string;
    onClick?: () => void;
}
const Error = ({message, onClick}: ErrorProps) => {
  return (
    <div className={`w-80 h-60 bg-red-600/20 border-2 border-red-600 rounded-lg flex flex-col items-center justify-center text-center p-4`}>
        <div className={`text-red-600 font-bold text-lg mb-2`}>Error</div>

        <div className='font-bold flex items-center justify-center gap-2 mb-2'>
            <Loading size={5} color="error" />
            <div className={`text-red-500`}>Auto Refreshing...</div>
        </div>
        <div className={`text-red-400 text-sm mb-4`}>{message}</div>

        <Button buttonName="Refresh" color="error" onClick={onClick} />
    </div>
  )
}

export default Error;