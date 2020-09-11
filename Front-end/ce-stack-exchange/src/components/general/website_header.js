import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper'
import { useHistory } from "react-router-dom";
import "./logostyle.css"

const logoAddress = "https://ir11.uploadboy.com/d/favsy6t87ekz/ubnouvuqjdkoleohtavwrt6h76a6xfafm64azz2645ddwu7m7larl47bujbfw2xhuiyyymoo/logo.png"

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //const history = useHistory();
    const goSomewhere = () => {
        window.location.href = "#"
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>حساب من</MenuItem>
            <MenuItem onClick={handleMenuClose}>فعالیت های من</MenuItem>
            <MenuItem onClick={handleMenuClose}>خروج</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>پیام‌ها</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>حساب من</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <IconButton onClick={goSomewhere}>
                        <svg width="112" height="152" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <title>:)</title>
                                <rect x="-1" y="-1" id="canvas_background" fill="transparent" />
                                <g id="canvasGrid" display="none">
                                    <rect id="svg_5" width="100%" height="100%" x="0" y="0" strokeWidth="0" fill="url(#gridpattern)" />
                                </g>
                            </g>
                            <g id="wholeIcon">
                                <title>:)</title>
                                <rect fill="#064c64" stroke="#064c64" strokeWidth="1.5" x="23.0625" y="33.84375" width="61.875" height="11.625" id="rect_1" />
                                <rect fill="#99222e" stroke="#99222e" strokeWidth="1.5" x="23.25" y="48.75" width="61.875" height="11.625" id="rect_2" />
                                <rect fill="#f47318" stroke="#f47318" strokeWidth="1.5" x="23.25" y="63.75" width="61.875" height="11.625" id="rect_3" />
                                <rect fill="#f4af54" stroke="#f4af54" strokeWidth="1.5" x="23.25" y="78.75" width="61.875" height="11.625" id="rect_4" />
                                <rect fill="#e9ddba" stroke="#e9ddba" strokeWidth="1.5" x="23.25" y="93.75" width="61.875" height="11.625" id="rect_5" />
                                <rect stroke="#b1aa97" className="box_side" height="61.125" width="7.125" y="48.39375" x="11.0625" strokeOpacity="null" strokeWidth="1.5" fill="#b1aa97" />
                                <rect stroke="#b1aa97" className="box_bottom" height="7.125" width="85.6875" y="110.26875" x="11.0625" strokeOpacity="null" strokeWidth="1.5" fill="#b1aa97" />
                                <rect stroke="#b1aa97" className="box_side" height="61.125" width="7.125" y="48.39375" x="89.625" strokeOpacity="null" strokeWidth="1.5" fill="#b1aa97" />
                            </g>
                        </svg>
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        <a onClick={goSomewhere} style={{ cursor: "pointer" }}>
                            نام سایت :)
                        </a>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase

                            placeholder="سوالت رو پیدا کن..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={/*TODO*/ "۴"} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar >
            </AppBar >
            {/* <Paper>
                <div className={classes.toolbar} />
                <br />
                <br />
                <br />
                <br />
                <br />
            </Paper> */}
            {renderMobileMenu}
            {renderMenu}
        </div >
    );
}