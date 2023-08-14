import React from 'react';

import { Modal } from '@mui/material';
import NextLink from 'next/link';

import { TrendIcon } from '@components/icons';

import * as S from './Card.styles';

export type Props = {
  href: string;
  isActive?: boolean;
  segment: string;
  image: {
    src: string;
    alt: string;
  };
  badge?: {
    content: string;
    variation: 'trend';
  };
};

const badges = {
  trend: {
    icon: <TrendIcon />,
    color: '#6A00A3',
  },
};

export const Card = ({ badge, href, image, isActive = false, segment }: Props) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);

  return (
    <>
      <S.Card aria-disabled={!isActive} role="option" aria-label="template">
        <div>
          <S.Image
            isActive={isActive}
            onClick={isActive ? () => setIsPreviewModalOpen(true) : () => null}
            src={image.src}
            alt={image.alt}
          />
        </div>

        <S.WrapperFooterDetail>
          <S.WrapperFooterDetailInformation>
            <span>Seguimento indicado</span>

            <span>{segment}</span>
          </S.WrapperFooterDetailInformation>

          {badge && (
            <S.Badge>
              {badges[badge.variation].icon}

              {badge.content}
            </S.Badge>
          )}
        </S.WrapperFooterDetail>
      </S.Card>

      <Modal open={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
        <>
          <S.Image isActive={false} src={image.src} alt={image.alt} />

          <S.ModalAction>
            <NextLink href={href} target="_blank" passHref>
              <a href="replace" target="_blank">
                <button type="button">Preview</button>
              </a>
            </NextLink>
          </S.ModalAction>
        </>
      </Modal>
    </>
  );
};
