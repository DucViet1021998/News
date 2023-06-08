'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import axiosClient from '~/api-client/axios-client';
import { LogoIcon } from '../../../public/icons/Icons';
import Link from 'next/link';

interface Pages {
    id: string;
    kichHoat: boolean;
    ngayTao: string;
    tenDanhMuc: string;
    thuTu: number;
}

function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [pages, setPages] = useState<Array<Pages>>([]);

    useEffect(() => {
        async function getDanhSachDanhMucTinTuc() {
            const res = await axiosClient.get(
                'DanhMucTinTuc/GetDanhSachDanhMucTinTuc?skip=0&limit=30'
            );
            setPages(res.data.data);
        }

        getDanhSachDanhMucTinTuc();
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: any) => {
        console.log(event.target.innerText);

        setAnchorElNav(null);
    };

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
                            {pages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.tenDanhMuc}</Typography>
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
                        {pages.map((page) => (
                            <Button
                                key={page.id}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.tenDanhMuc}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;
