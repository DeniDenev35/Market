<?php

// BEGIN iThemes Security - Do not modify or remove this line
// iThemes Security Config Details: 2
define( 'DISALLOW_FILE_EDIT', true ); // Disable File Editor - Security > Settings > WordPress Tweaks > File Editor
// END iThemes Security - Do not modify or remove this line

define( 'ITSEC_ENCRYPTION_KEY', 'Zi9ZOiBuZTtiRHwxZXwoQ2JQNTl1LSNUallZNTMvRWRKcUptYHwjeG86V3okQDdMJTBzSllFNHh7dlMsNjdCOA==' );

define( 'WP_CACHE', true ); 
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'Market' );
/** Database username */
define( 'DB_USER', 'root' );
/** Database password */
define( 'DB_PASSWORD', '' );
/** Database hostname */
define( 'DB_HOST', 'localhost' );
/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );
/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'X$z`08{c@- UhizsA#{:g<mm2..Y9bfYb3#lVF5sF,i F:a.|4#~,Qh.DyJIg^Rq' );
define( 'SECURE_AUTH_KEY',  '-XnEUG54:Io7~%2TBGPtQBdsUT#U].(O>9|]/mrDTM}|ww[>Y^_TX,aSjdt?3w@]' );
define( 'LOGGED_IN_KEY',    'uroPpv;dDYwlQ_6ZU7zxrZK.6S+)aXqgk@NW;e&0ew -C*4b}<t;QtcH[h2>SE3h' );
define( 'NONCE_KEY',        'F@yvl#6#^rHAU{Yqa112i4(Akh0@;wCTYUp4I(8f8?0h:^3<hO`!rSxyD|h22`Z!' );
define( 'AUTH_SALT',        '$3 P_[_wT0)>sUJD1~8E=ma%:E_W2Pr;5<2XT[w#q,)+*^5I[PFdETmAajCpk&Ta' );
define( 'SECURE_AUTH_SALT', 'gbDkpmD-l{W?Yio=G5]y4PqVtJDxb2oLo%X8$Ns4RPGQt%7UNk4w7$8UkH%e(wMZ' );
define( 'LOGGED_IN_SALT',   '0?Cu<q&kP77]wf+e`F(qN|]}lNmB.T~eek[%+m<,<=JJ12X4N#a4DuyZb9bshy,]' );
define( 'NONCE_SALT',       'nrY|5e7=7WaP+4,k/R2gN>1/@<V)%-1?zcrT_6b+$hyeiFGxz=gc;D193)yT8v^k' );
/**#@-*/
/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
/* Add any custom values between this line and the "stop editing" line. */
/* That's all, stop editing! Happy publishing. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';