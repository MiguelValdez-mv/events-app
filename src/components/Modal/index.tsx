export type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
};

export function Modal({ isOpen, children, closeModal }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={closeModal}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "90%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
