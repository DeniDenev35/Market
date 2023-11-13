<?php
/**
 * Builder Plugin Compatibility Code
 *
 * @package    Themify_Builder
 * @subpackage Themify_Builder/classes
 */

class Themify_Builder_Plugin_Compat_RankMath {

	static function init() {
		if(is_admin()){
			add_filter( 'themify_builder_active_vars', array( __CLASS__, 'themify_builder_admin_vars' ) );
			add_action( 'wp_ajax_tb_rank_math_content_ajax', array( __CLASS__, 'wp_ajax_tb_rank_math_content_ajax' ) );
			add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_enqueue_scripts' ), 10 );
			add_filter( 'rank_math/video/content', [ __CLASS__, 'scan_builder_content' ], 10, 2 );
			add_filter( 'rank_math/links/content', [ __CLASS__, 'scan_builder_content' ], 10, 2 );
		}
		add_filter( 'rank_math/sitemap/content_before_parse_html_images', array( __CLASS__, 'sitemap' ), 10, 2 );
	}

	/*
	 * Localize builder output for Rank Math Plugin integration
	 * */
	public static function themify_builder_admin_vars( $vars ) {
		global $ThemifyBuilder;
		$vars['builder_output'] = $ThemifyBuilder->get_builder_output( Themify_Builder_Model::get_ID() );

		return $vars;
	}

	/*
	 * Send back builder output based on current builder data for Rank Meta Plugin integration
	 * */
	public static function wp_ajax_tb_rank_math_content_ajax() {
		if ( empty( $_POST['id'] ) || ! current_user_can( 'edit_post', $_POST['id'] ) ) {
			die;
		}

		Themify_Builder_Component_Base::retrieve_template('builder-output.php', array('builder_output' => $_POST['data'], 'builder_id' => $_POST['id']), THEMIFY_BUILDER_TEMPLATES_DIR);
		wp_die();
	}

	/**
	 * Load Admin Scripts.
	 *
	 * @access public
	 * @param string $hook
	 */
	public static function admin_enqueue_scripts( $hook ) {
		$post_type = get_post_type();
		if (
			in_array( $hook, array( 'post-new.php', 'post.php' ), true )
			&& Themify_Access_Role::check_access_backend()
			&& in_array( $post_type, themify_post_types(), true )
			&& ! Themify_Builder_Model::is_builder_disabled_for_post_type( $post_type )
		) {
			themify_enque_script( 'themify-builder-rankmath', THEMIFY_BUILDER_URI .'/includes/plugin-compat/js/rankmath.js' , THEMIFY_VERSION, array( 'jquery', 'wp-hooks', 'rank-math-analyzer' ));
		}
	}

	/**
	 * Fix the image counter in Rank Math site map.
	 *
	 * Append a plain text version of Builder output, before Rank Math
	 * searches for images in the post content.
	 *
	 * @return string
	 */
	public static function sitemap( $content, $post_id ) {
		$builder_data = ThemifyBuilder_Data_Manager::get_data( $post_id );
		$plain_text = ThemifyBuilder_Data_Manager::_get_all_builder_text_content( $builder_data );
		$plain_text = do_shortcode( $plain_text ); // render shortcodes that might be in the Themify_Builder_Component_Module::get_plain_text()

		return $content . $plain_text;
	}

	/**
	 * Enable RankMath to scan Builder's contents
	 *
	 * @return string
	 */
	public static function scan_builder_content( $content, $object_id ) {
		global $ThemifyBuilder;
		$content = $content . ' ' . $ThemifyBuilder->get_builder_output( $object_id );
 
		return $content;
	}
}