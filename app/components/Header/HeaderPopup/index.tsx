import { PopupWrapper } from '../../PopupWrapper';
import { HeaderPopupItem } from '../HeaderPopupItem';

export const HeaderPopup = ({
    openPopup,
    openPopupFunc,
}: {
    openPopup: boolean;
    openPopupFunc: () => void;
}) => {
    return (
        <PopupWrapper openPopupFunc={openPopupFunc} openPopup={openPopup}>
            <HeaderPopupItem link="/programs/programCreateModal" text="Программу" />
            <HeaderPopupItem link="/devices/deviceCreateModal" text="Устройства" />
            <HeaderPopupItem isLast={true} text="Лицензии" />
        </PopupWrapper>
    );
};
