/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Solid dependencies
 */
import { Heading, TextWeight } from '@ithemes/ui';

/**
 * Internal dependencies
 */
import { Page, RuleForm } from '../../components';

export default function CreateRule() {
	const [ rule, setRule ] = useState( {} );

	return (
		<Page>
			<Heading level={ 2 } weight={ TextWeight.HEAVY } text={ __( 'Create Firewall Rule', 'better-wp-security' ) } />
			<RuleForm value={ rule } onChange={ setRule } />
		</Page>
	);
}
