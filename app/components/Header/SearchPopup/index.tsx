import { PopupWrapper } from '../../PopupWrapper';
import { HeaderPopupItem } from '../HeaderPopupItem';
import { Device, Software } from '@/generated/prisma/client';

export const SearchPopup = ({
    openPopup,
    openPopupFunc,
    itms = [],
}: {
    openPopup: boolean;
    openPopupFunc: () => void;
    itms: { id: number; link: string; category: string; items: Device[] | Software[] }[];
}) => {
    const list = itms.flatMap((itm) => itm.items);

    if (list.length === 0) return;

    return (
        <PopupWrapper width={150} openPopupFunc={openPopupFunc} openPopup={openPopup}>
            {itms.map((itm) => {
                if (itm.items.length === 0) return;

                return (
                    <div key={itm.id} className="w-full">
                        <div className="text-black">{itm.category}</div>
                        {itm.items.map((i) => {
                            return (
                                <HeaderPopupItem
                                    link={`${itm.link}/${i.id}`}
                                    key={i.id}
                                    text={i.hostname || i.name}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </PopupWrapper>
    );
};
