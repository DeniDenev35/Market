/**
 * External dependencies
 */
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { SlotFillProvider, Popover } from '@wordpress/components';
import { PluginArea } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';

/**
 * iThemes dependencies
 */
import { solidTheme, Surface, SurfaceVariant } from '@ithemes/ui';

/**
 * Internal dependencies
 */
import { TopToolbar } from '@ithemes/security-ui';
import { coreStore } from '@ithemes/security.packages.data';
import { Logs, Rules, Rule, Configure, CreateRule } from './pages';

import './style.scss';

const StyledApp = styled( Surface )`
	display: flex;
	flex-direction: column;
`;

export default function App( { history } ) {
	const { hasCustomFirewallRules } = useSelect( ( select ) => ( {
		hasCustomFirewallRules: select( coreStore ).getFeatureFlags().includes( 'customFirewallRules' ),
	} ), [] );

	return (
		<ThemeProvider theme={ solidTheme }>
			<Router history={ history }>
				<QueryParamProvider ReactRouterRoute={ Route }>
					<StyledApp className="itsec-firewall" variant={ SurfaceVariant.UNDER_PAGE }>
						<SlotFillProvider>
							<PluginArea />
							<Popover.Slot />
							<TopToolbar />
							<Switch>
								<Route
									path="/logs"
									component={ Logs }
								/>
								{ hasCustomFirewallRules && (
									<Route
										path="/rules/new"
										component={ CreateRule }
									/>
								) }
								<Route
									path="/rules/:id"
									component={ Rule }
								/>
								<Route
									path="/rules"
									component={ Rules }
								/>
								<Route
									path="/configure/:tab"
									component={ Configure }
								/>
								<Route path="/">
									<Redirect to="/logs" />
								</Route>
							</Switch>
						</SlotFillProvider>
					</StyledApp>
				</QueryParamProvider>
			</Router>
		</ThemeProvider>
	);
}

export { AsideHeaderFill, FirewallBannerFill } from './components/header-aside';
