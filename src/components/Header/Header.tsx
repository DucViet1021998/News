'use client';

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useSWR from 'swr';
import { LogoIcon } from '../../../public/icons/Icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Pages {
    id: string;
    kichHoat: boolean;
    ngayTao: string;
    tenDanhMuc: string;
    thuTu: number;
}

function Header() {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const { data, error } = useSWR('DanhMucTinTuc/GetDanhSachDanhMucTinTuc?skip=0&limit=30');

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    if (error) return <div>Đã xảy ra lỗi</div>;
    return (
        <header className="fixed top-0 w-full h-20 z-50">
            <AppBar className="pl-4">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Link href={'/'}>
                            {' '}
                            <LogoIcon />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {data?.data.data.map((page: Pages) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <span
                                            onClick={() => {
                                                router.push(`/danh-muc/${page.id}`);
                                                console.log(page.id);
                                            }}
                                        >
                                            {page.tenDanhMuc}
                                        </span>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, mr: 1 }}>
                        <Link href={'/'}>
                            {' '}
                            <LogoIcon />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {data?.data.data.map((page: Pages) => (
                            <Button
                                key={page.id}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <span onClick={() => router.push(`/danh-muc/${page.id}`)}>
                                    {' '}
                                    {page.tenDanhMuc}
                                </span>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;
