import {
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
const ModalComponte = ({ buttonModal, tittleModal, componente, size }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color="primary" variant="bordered" onPress={onOpen}>
        {buttonModal}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {tittleModal}
              </ModalHeader>
              <ModalBody>{componente}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </>
  );
};

export default ModalComponte;
