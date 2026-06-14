'use client';
import { CardContainer } from '../CardContainer';
import { useGetSoftware } from '../../queries/software.api';
import { Software } from '../../../generated/prisma/client';
import SoftwareCard from '../SoftwareCard';

export const SoftwareBox = () => {
    const { data: software, isLoading, isError } = useGetSoftware();

    const softwareArr = !isLoading && !!software ? software : [];

    return (
        <CardContainer isLoading={isLoading || !software} isError={isError}>
            {softwareArr.map((itm: Software) => (
                <SoftwareCard key={itm.id} id={itm.id} name={itm.name} />
            ))}
        </CardContainer>
    );
};
