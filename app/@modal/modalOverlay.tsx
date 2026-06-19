export default function ModalOverlay({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-3000 bg-black/50 flex items-center justify-center">
            {children}
        </div>
    );
}
