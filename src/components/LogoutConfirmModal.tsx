import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import logoutImage from "../assets/logout.png";
import Image from "next/image";

interface LogoutConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  onConfirm,
  onCancel,
  isOpen,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />

        {/* Modal content */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f4f2ff] rounded-lg shadow-xl p-6 z-50  w-[700px]">
          <div className="w-[60%] h-full flex-col justify-center mb-10 ">
            <div>
              <h1 className="text-[28px] font-bold text-[#433f3f] text-center mt-20">
                Come Back Soon!
              </h1>
              <p className="mt-6 text-center text-lg font-medium">Are you sure you want to log out?</p>
              <div className="flex gap-4 justify-center mt-8">
                <button className="bg-[#9d77cb] px-6 rounded-full text-white font-semibold py-2 w-[140px]" onClick={onConfirm}>Yes</button>
                <button className="bg-[#6e4a99] px-6 rounded-full text-white font-semibold py-2 w-[140px] " onClick={onCancel}>Cancel</button>
              </div>
            </div>
            <Image
              src={logoutImage}
              alt="Logout"
              width={50}
              height={50}
              className="mr-4 absolute right-0 bottom-0 w-72 "
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LogoutConfirmModal;
