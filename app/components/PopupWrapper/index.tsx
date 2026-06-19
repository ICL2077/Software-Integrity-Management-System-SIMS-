const PopupWrapper = ({
    openPopupFunc,
    openPopup,
    children,
    width,
    height,
}: {
    openPopupFunc: () => void;
    openPopup: boolean;
    children: React.ReactNode;
    width?: number | string | null;
    height?: number | string | null;
}) => {
    return (
        <div
            onClick={openPopupFunc}
            className={`absolute z-500 flex flex-col items-center justify-center overflow-hidden transition-all ease-in-out top-15 bg-white border-2 border-gray-500 rounded-2xl w-${
                width ? width : 50
            } h-${height ? height : 40} ${
                openPopup
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'translate-y-3 opacity-0 pointer-events-none'
            }`}>
            {children}
        </div>
    );
};

PopupWrapper.displayName = 'PopupWrapper';

export { PopupWrapper };
