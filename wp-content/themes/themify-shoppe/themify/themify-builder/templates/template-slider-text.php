<?php

defined( 'ABSPATH' ) || exit;

/**
 * Template Slider Text
 * 
 * This template can be overridden by copying it to yourtheme/themify-builder/template-slider-text.php.
 *
 * Access original fields: $args['settings']
 * @author Themify
 */
$total_items = count( $args['settings']['text_content_slider'] );
if (!empty($args['settings']['text_content_slider'])):?>
    <?php foreach ($args['settings']['text_content_slider'] as $index => $content): ?>
		<?php if ( $index % $args['settings']['items_per_slide'] === 0 ) : ?><div class="tf_swiper-slide"><?php endif; ?>
            <div class="slide-inner-wrap"<?php if ($args['settings']['margin'] !== ''): ?> style="<?php echo $args['settings']['margin']; ?>"<?php endif; ?>>
                <div class="slide-content tb_text_wrap"<?php self::add_inline_edit_fields('text_caption_slider',true,true,'text_content_slider')?>>
                    <?php
                    if (isset($content['text_caption_slider'])) {
                        echo apply_filters('themify_builder_module_content', $content['text_caption_slider']);
                    }
                    ?>
                </div><!-- /slide-content -->
            </div>
        <?php if ( ( $index + 1 ) % $args['settings']['items_per_slide'] === 0 || ( $index + 1 ) === $total_items ) : ?></div><!-- .tf_swiper-slide --><?php endif; ?>
    <?php endforeach; ?>
<?php endif; 