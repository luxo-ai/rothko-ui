'use client';

import { Drawer } from '@rothko-ui/drawer';
import { Menu } from '@rothko-ui/icons';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NavList } from './NavList';
import { PhantomButton } from '../button';

export const NavMobileMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    <>
      <PhantomButton
        aria-label="Menu"
        className="flex mt-0.5"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Menu width={28} height={28} />
      </PhantomButton>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <NavList style={{ marginLeft: '0.5rem' }} onNavigate={() => setIsDrawerOpen(false)} />
      </Drawer>
    </>
  );
};
