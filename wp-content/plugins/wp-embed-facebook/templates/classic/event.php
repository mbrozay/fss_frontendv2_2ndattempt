<?php
$height            = $width * $prop;
$start_time_format = 'l, j F Y g:i a';
$old_time_zone = date_default_timezone_get();
if(get_option('wpemfb_ev_local_tz') == 'true'){
	$timezone = get_option( 'timezone_string' );
} else {
	$timezone = isset( $fb_data['timezone'] ) ? $fb_data['timezone'] : get_option( 'timezone_string' );
}
date_default_timezone_set( $timezone );
$start_time = date_i18n( $start_time_format, strtotime( $fb_data['start_time'] ) );
date_default_timezone_set( $old_time_zone );
?>
<div class="wef-classic wef-measure" style="max-width: <?php echo $width ?>px">
	<div class="cover" style="height:<?php echo $height ?>px; background-image: url('<?php echo $fb_data['cover']['source'] ?>'); background-position: 0% <?php echo $fb_data['cover']['offset_y'] ?>%;" onclick="window.open('http://www.facebook.com/<?php echo $fb_data['id'] ?>', '_blank')" ></div>
	<div class="row pad-top">
		<div class="col-12">
			<a href="http://www.facebook.com/<?php echo $fb_data['id'] ?>" target="_blank" rel="nofollow">
				<span class="title"><?php echo $fb_data['name'] ?></span>
			</a>
			<p><?php echo $start_time ?></p>
			<p>
				<?php
				if ( isset( $fb_data['place']['id'] ) ) {
					_e( '@ ', 'wp-embed-facebook' );
					echo '<a href="http://www.facebook.com/' . $fb_data['place']['id'] . '" target="_blank">' . $fb_data['place']['name'] . '</a>';
				} else {
					echo isset( $fb_data['place']['name'] ) ? __( '@ ', 'wp-embed-facebook' ) . $fb_data['place']['name'] : '';
				}
				?>
			</p>
			<p><?php echo __( 'Creator: ', 'wp-embed-facebook' ) . '<a href="http://www.facebook.com/' . $fb_data['owner']['id'] . '" target="_blank">' . $fb_data['owner']['name'] . '</a>' ?></p>
		</div>
	</div>
</div>
