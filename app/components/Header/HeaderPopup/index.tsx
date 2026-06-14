import { HeaderPopupItem } from '../HeaderPopupItem';

export const HeaderPopup = ({ openPopup }: { openPopup: boolean }) => {
    return (
        <div
            className={`absolute z-500 flex flex-col items-center justify-center overflow-hidden transition-all ease-in-out top-15 bg-white border-2 border-gray-500 rounded-2xl min-w-50 min-h-40 ${
                openPopup ? 'opacity-100 translate-y-0' : 'translate-y-3 opacity-0'
            }`}>
            <HeaderPopupItem text="Программу" />
            <HeaderPopupItem text="Устройства" />
            <HeaderPopupItem isLast={true} text="Лицензии" />
        </div>
    );
};
