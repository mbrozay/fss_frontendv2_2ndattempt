<div class="wef-classic" style="max-width: <?php echo $width ?>px">
	<div class="row">
		<div class="col-3 text-center">
			<a href="http://www.facebook.com/<?php echo $fb_data['id'] ?>" target="_blank" rel="nofollow">
				<img src="http://graph.facebook.com/<?php echo $fb_data['id'] ?>/picture" />
			</a>
		</div>
		<div class="col-9 pl-none">
			<a href="http://www.facebook.com/<?php echo $fb_data['id'] ?>" target="_blank" rel="nofollow">
				<span class="title"><?php echo $fb_data['name'] ?></span>
			</a>
			<br>
			<div>
				<?php
				$opt = get_option('wpemfb_show_like');
				if($opt === 'true') :
					echo WEF_Social_Plugins::like_btn('https://www.facebook.com/'.$fb_data['id'],array('share'=>'true','layout'=>'button_count'));
				else :
					printf( __( '%d people like this.', 'wp-embed-facebook' ), $fb_data['likes'] );
				endif;
				?>
			</div>
			<?php if(isset($fb_data["website"])) : ?>
				<br>
				<a href="<?php echo WP_Embed_FB::getwebsite($fb_data["website"]) ?>" title="<?php _e('Web Site', 'wp-embed-facebook')  ?>" target="_blank">
					<?php _e('Web Site','wp-embed-facebook') ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
</div>
