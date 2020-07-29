import React from 'react';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavList,
  PageSection,
  PageSidebar
} from '@patternfly/react-core';
import { KogitoPageLayout } from '@kogito-apps/common';

const imgBrand =
  'data:image/svg+xml;base64,PHN2ZyBpZD0iYXJ0d29yayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzAwIiBoZWlnaHQ9Ijg1IiB2aWV3Qm94PSIwIDAgMTI4MCAzNjQiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDA1ODZmO30uY2xzLTJ7ZmlsbDojZmZmO30uY2xzLTN7ZmlsbDojZjg4ZDJiO30uY2xzLTR7ZmlsbDojYjhkOGViO308L3N0eWxlPjwvZGVmcz48dGl0bGU+a29naXRvX2xvZ29fcmdiX2NvbG9yX2hvcml6b250YWxfcmV2ZXJzZTwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjk3LjI4LDExLjMxQTI0LjU1LDI0LjU1LDAsMCwwLDI3Ny4zLDFjLTEuNDMsMC00Ni45MSw3LjkyLTQ2LjkxLDcuOTJhMjQuNTYsMjQuNTYsMCwwLDAtMTYuODEsMTEuNjJsLTcuNjYsMTIuODhDMTg5LDE4LjU4LDE3MC4zNiwxMC44MSwxNTEuNCwxMC44MXMtMzcuNiw3Ljc3LTU0LjUyLDIyLjYxTDg5LjIzLDIwLjU0QTI0LjU2LDI0LjU2LDAsMCwwLDcyLjQyLDguOTJTMjYuOTQsMSwyNS41MSwxQTI0LjUzLDI0LjUzLDAsMCwwLDQuMDksMzcuNDlMMjEuNjUsNjguOTRhNDAuMjQsNDAuMjQsMCwwLDAsMjEuMDgsNTkuMzhMMTAuMywyNzguMzhsMTQxLjEsNzkuODMsMTQxLjExLTc5LjgzTDI2MC4wOCwxMjguMzJhNDAuMjQsNDAuMjQsMCwwLDAsMjEuMDctNTkuMzhsMTcuNTYtMzEuNDVBMjQuNjEsMjQuNjEsMCwwLDAsMjk3LjI4LDExLjMxWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE0MC4yNSw5Ny45MmwzLDAsOC4xNSw4LjExLDguMS04LjExLDMsMGMyMi4xLjIyLDQzLjI4LDEuMSw2MS42MSwyLjU0LTE2LjA1LTM0Ljc3LTQyLjYzLTY1LjEyLTcyLjcxLTY1LjEyUzk0Ljc1LDY1LjY5LDc4LjY5LDEwMC40NkM5Nyw5OSwxMTguMTgsOTguMTQsMTQwLjI1LDk3LjkyWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTEyOS4yOCwyNDRhNDAuNjYsNDAuNjYsMCwwLDAsNDUuODUuMTgsMjAzLDIwMywwLDAsMC00NS44NS0uMThaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMjE0LjE3LDIzOC4yM2E2NC45Miw2NC45MiwwLDAsMC02LTE0LjQ5Yy0uNDItLjc0LS44Ny0xLjQ2LTEuMzItMi4xOS0uMjYtLjQxLS41LS44NC0uNzctMS4yNS0uNDItLjY0LS44Ny0xLjI2LTEuMzEtMS44OS0uMzMtLjQ3LS42NC0uOTUtMS0xLjQxcy0uODEtMS0xLjIyLTEuNTUtLjgzLTEuMDctMS4yNy0xLjYtLjcxLS44LTEuMDctMS4yYTY1LjE5LDY1LjE5LDAsMCwwLTI4LjI2LTE4LjcxYy02LDQtMTMuNjEsNy45My0yMC41Myw3Ljkzcy0xNC40OS0zLjg5LTIwLjUyLTcuOTNhNjUuMTUsNjUuMTUsMCwwLDAtMjguMjgsMTguNzNjLS4zNS40LS43MS43OC0xLDEuMThzLS44NiwxLjA3LTEuMjgsMS42MS0uODIsMS0xLjIxLDEuNTQtLjY2Ljk0LTEsMS40MWMtLjQ0LjYzLS44OSwxLjI1LTEuMywxLjg5LS4yNy40MS0uNTIuODQtLjc4LDEuMjctLjQ1LjcxLS44OSwxLjQzLTEuMzEsMi4xNmE2NS4xOSw2NS4xOSwwLDAsMC02LDE0LjVjNC40OS0xLjU0LDkuMjQtMi44OCwxNC4xNC00LjA4YS4wOC4wOCwwLDAsMSwwLS4wNWwxLjU0LS4zNSw1LjkyLTE2LjUydjE1LjIxbDEuMDYtLjE5cTMuMjgtLjY1LDYuNjgtMS4xOWwuODMtLjEzcTQuMTEtLjY1LDguMzQtMS4xMmw0Ljg1LTE5LjR2MTguOWMzLS4yNiw2LS40NSw5LjA5LS42bDEuMzgtLjA2YzEuMTQsMCwyLjI4LS4wOSwzLjQzLS4xMiwxLjgzLS4wNSwzLjY3LS4wOCw1LjUyLS4wOHMzLjgyLDAsNS43MS4wOWwzLC4xMXExLDAsMiwuMDljMi45Mi4xNCw1LjgyLjMzLDguNjcuNThWMjEwLjQxbDQuODUsMTkuNDEuNTguMDdjMi41NS4zLDUuMDguNjMsNy41NiwxLDEsLjE1LDEuODkuMzMsMi44My40OSwxLjM4LjIzLDIuNzYuNDcsNC4xMi43My42LjExLDEuMjIuMiwxLjgyLjMyVjIxNy4yM2w1LjkyLDE2LjUzYy40My4xLjg0LjIzLDEuMjcuMzNsMS45My40NiwwLDBDMjA2LDIzNS42OCwyMTAuMiwyMzYuODcsMjE0LjE3LDIzOC4yM1oiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0yMzAuMjUsMTE1LjMybC0zLjQ5LS4zYy0xOC0xLjUzLTM5LjE5LTIuNDgtNjEuNC0yLjc2bC0xMy45NCwxMy45NS0xNC0xMy45NWMtMjIuMTkuMjktNDMuMzQsMS4yNC02MS4zNSwyLjc3bC0zLjQ5LjI5Yy02LjM1LDE3LjM5LTkuOTQsMzUtOS45NCw0OS42OSwwLDI0LjQ0LDkuOSwzNi40MSwyNS44OCw0Mi4yN2E4MC4yMSw4MC4yMSwwLDAsMSwzMC4xNC0yMy44M0E3LjE0LDcuMTQsMCwwLDEsMTI5Ljg5LDE3NWM1LjYzLDUuMjEsMTYsMTIuNTUsMjEuNTEsMTIuNTVzMTYuMDYtNy40OSwyMS41MS0xMi41NWE3LjE0LDcuMTQsMCwwLDEsMTEuMjUsOC40NCw4MC4xNCw4MC4xNCwwLDAsMSwzMC4xNCwyMy44M2MxNi01Ljg2LDI1Ljg4LTE3LjgyLDI1Ljg4LTQyLjI3QzI0MC4xOCwxNTAuMjgsMjM2LjU5LDEzMi43MSwyMzAuMjUsMTE1LjMyWk0xMTMuNDgsMTYyLjRjLTEwLjI1LjIzLTE5LjU5LTUuNjYtMjYuMTUtMTUuMjEsNi4xMy05LjgzLDE1LjE5LTE2LjE0LDI1LjQ0LTE2LjM3czE5LjU4LDUuNjYsMjYuMTUsMTUuMjFDMTMyLjc5LDE1NS44NiwxMjMuNzIsMTYyLjE3LDExMy40OCwxNjIuNFptMTAyLTQuNjFMMjA0LjMsMTY5bC0xMS4xOS0xMS4xOEwxODEuOTMsMTY5bC0xMS4xOC0xMS4xOCwxMS4xOC0xMS4xOC0xMS4xOC0xMS4xOCwxMS4xOC0xMS4xOCwxMS4xOCwxMS4xOCwxMS4xOS0xMS4xOCwxMS4xOCwxMS4xOEwyMDQuMywxNDYuNjFaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTg1LDI3OS4yMWw3LDI3Ljg1TDIxOC42NywyOTJWMjYxbDYuNzgsMjcuMSwzOS4yNi0yMi4yMUwyNDkuMSwxOTMuNjhjLTUuMjIsMTEuODYtMTQuMjIsMjAuNTQtMjcsMjUuOTFBNzguMzMsNzguMzMsMCwwLDEsMjI4LDIzNC4zOGExNC4zMiwxNC4zMiwwLDAsMS0xOC40MywxNy4zOSwxNTIuODQsMTUyLjg0LDAsMCwwLTE2LjMzLTQuNTQsNTQuODksNTQuODksMCwwLDEtODItLjM1LDE1NC4yLDE1NC4yLDAsMCwwLTE3LjkxLDQuODksMTQuMzEsMTQuMzEsMCwwLDEtMTguNDItMTcuMzksNzguNjksNzguNjksMCwwLDEsNS44My0xNC44Yy0xMi43Ny01LjM2LTIxLjc2LTE0LjA1LTI3LTI1LjlMMzguMDksMjY1LjkybDM5LjI3LDIyLjIxTDg0LjE0LDI2MVYyOTJsMjYuNjcsMTUuMDksNy0yNy44NVYzMTFsMzMuNjMsMTlMMTg1LDMxMVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik02MS4yLDEwNUEyMDIuMjIsMjAyLjIyLDAsMCwxLDc2LjQyLDc0LjMzcTQuMTctNi44Myw4LjYzLTEyLjgxTDY4LjE0LDMzLjA4LDI1LjUxLDI1LjUzLDUzLDc0LjgzbDAsMEExNS42NiwxNS42NiwwLDEsMCw2MS4yLDEwNVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yNDkuNzQsNzQuODVsMCwwLDI3LjUzLTQ5LjMtNDIuNjIsNy41NUwyMTcuNzYsNjEuNTJxNC40NSw2LDguNjMsMTIuODFBMjAyLjIyLDIwMi4yMiwwLDAsMSwyNDEuNjEsMTA1YTE1LjY2LDE1LjY2LDAsMSwwLDguMTMtMzAuMTFaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDYyLjg1LDE2My44OGwzLjg3LTYuMTMsOTUuNDktOTkuMzZoNDAuMzJsLTk2LjQ1LDEwMEw2MDgsMjkxLjYzSDU2OC4zNEw0ODMuMTcsMTc4LjRsLTE5LjY3LDE5LC4zMiw5NC4ySDQzMS44OFY1OC4zOWgzMS45NHY5My44OFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik02MjUuNiwxODcuNTlBNjguMjIsNjguMjIsMCwwLDEsNjUyLjA1LDE2MnExNi45NC05LjM2LDM4LjIzLTkuMzZ0MzcuOSw5LjM2QTY2LjgyLDY2LjgyLDAsMCwxLDc1NCwxODcuNDNhNzEuNjcsNzEuNjcsMCwwLDEsOS4xOSwzNi4xM0E3Mi40OCw3Mi40OCwwLDAsMSw3NTQsMjU5Ljg1YTY2LjE4LDY2LjE4LDAsMCwxLTI2LDI1LjY1cS0xNi43Nyw5LjM1LTM4LjM5LDkuMzUtMjEsMC0zNy43NC04Ljg3YTY1LjI3LDY1LjI3LDAsMCwxLTI2LjI5LTI1cS05LjUyLTE2LjEzLTkuNTItMzcuNDJBNzAsNzAsMCwwLDEsNjI1LjYsMTg3LjU5Wm0yNi40NSw1OS41MmE0My4xNSw0My4xNSwwLDAsMCwxNS40OCwxNi43OEE0MC40Myw0MC40MywwLDAsMCw2ODkuMzEsMjcwcTE4LjcxLDAsMzEtMTMuMjN0MTIuMjYtMzIuOTFxMC0xOS42Ni0xMi4yNi0zMy4wNnQtMzEtMTMuMzlhMzkuNDEsMzkuNDEsMCwwLDAtMjEuOTQsNi4yOSw0NC44Niw0NC44NiwwLDAsMC0xNS4zMiwxNi45NCw1MC42NCw1MC42NCwwLDAsMCwwLDQ2LjQ1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTkzMS41OCwxNTguMDhWMjkyLjZhNjEsNjEsMCwwLDEtOS4zNiwzMy4yMnEtOS4zNiwxNC44My0yNi42MSwyMy41NXQtNDAuNDksOC43MXEtMjAuMzIsMC0zNS02Ljc3dC0yOS41Mi0yMGwxNy43NS0yMC42NWE4OS4zMyw4OS4zMywwLDAsMCwyMS45MywxNS42NSw1NC42Niw1NC42NiwwLDAsMCwyNC4yLDUuMzJxMjIuMjYsMCwzNC4zNS0xMC42NXQxMi40Mi0yOC43MWwuMzMtMjUuMTZxLTcuNDMsMTIuNTgtMjEuNzgsMjAuMTZ0LTMzLjA3LDcuNThhNjQuMzgsNjQuMzgsMCwwLDEtMzMuODctOS4zNUE2OS4zMyw2OS4zMywwLDAsMSw3ODguMTgsMjYwYTc0Ljc2LDc0Ljc2LDAsMCwxLC4zMy03Mi40MkE2OS45MSw2OS45MSwwLDAsMSw4MTQuMTUsMTYyYTY3LjY1LDY3LjY1LDAsMCwxLDM0LjUyLTkuMzYsNzMuNzIsNzMuNzIsMCwwLDEsMzEuNjEsNi43OHExNC41Miw2Ljc2LDIxLjYyLDE3LjQybDIuMjYtMTguNzFaTTg4NS4xMiwyNjAuNjZhNDMsNDMsMCwwLDAsMTYuNDYtMjQuNTJWMjA5LjY5YTQzLjkyLDQzLjkyLDAsMCwwLTE3LjEtMjMuMzksNDkuMTYsNDkuMTYsMCwwLDAtMjktOC44N3EtMTkuNjgsMC0zMi45LDEyLjl0LTEzLjIzLDMyLjkxYTQ2LjMsNDYuMywwLDAsMCwyMi45MSw0MC40OCw0NC43Niw0NC43NiwwLDAsMCwyMy4yMiw2LjNRODcyLjU0LDI3MCw4ODUuMTIsMjYwLjY2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTk3NC4xNiw5OC4wN2ExOC40OCwxOC40OCwwLDAsMSwxMi41OC00Ljg0LDE3LjkyLDE3LjkyLDAsMCwxLDEyLjQyLDQuODQsMTYuMDYsMTYuMDYsMCwwLDEsMCwyMy44OCwxNy45MSwxNy45MSwwLDAsMS0xMi40Miw0LjgzQTE4LjQ3LDE4LjQ3LDAsMCwxLDk3NC4xNiwxMjJhMTUuNzMsMTUuNzMsMCwwLDEsMC0yMy44OFptMjYuNzcsNjBWMjkxLjYzaC0zMFYxNTguMDhaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTA4My41MSw5OS4zNnY1OUgxMTIwdjIzLjg3aC0zNi40NlYyOTEuNjNoLTMwLjMyVjE4Mi4yN2gtMjQuNTJWMTU4LjRoMjQuNTJ2LTU5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTExNDEuNDEsMTg3LjU5QTY4LjMyLDY4LjMyLDAsMCwxLDExNjcuODcsMTYycTE2Ljk0LTkuMzYsMzguMjItOS4zNlQxMjQ0LDE2MmE2Ni44OSw2Ni44OSwwLDAsMSwyNS44MSwyNS40OCw3MS42Nyw3MS42NywwLDAsMSw5LjE5LDM2LjEzLDcyLjQ4LDcyLjQ4LDAsMCwxLTkuMTksMzYuMjksNjYuMTgsNjYuMTgsMCwwLDEtMjYsMjUuNjVxLTE2Ljc4LDkuMzUtMzguMzksOS4zNS0yMSwwLTM3Ljc0LTguODdhNjUuMzYsNjUuMzYsMCwwLDEtMjYuMy0yNXEtOS41MS0xNi4xMy05LjUxLTM3LjQyQTcwLjEsNzAuMSwwLDAsMSwxMTQxLjQxLDE4Ny41OVptMjYuNDYsNTkuNTJhNDMuMTUsNDMuMTUsMCwwLDAsMTUuNDgsMTYuNzgsNDAuNDMsNDAuNDMsMCwwLDAsMjEuNzgsNi4xM3ExOC43LDAsMzEtMTMuMjN0MTIuMjYtMzIuOTFxMC0xOS42Ni0xMi4yNi0zMy4wNnQtMzEtMTMuMzlhMzkuMzgsMzkuMzgsMCwwLDAtMjEuOTQsNi4yOSw0NC44Niw0NC44NiwwLDAsMC0xNS4zMiwxNi45NCw1MC41Niw1MC41NiwwLDAsMCwwLDQ2LjQ1WiIvPjwvc3ZnPg==';

const TrustyApp = () => {
  const location = useLocation();

  const PageNav = (
    <Nav aria-label="Nav" theme="dark">
      <NavList>
        <NavItem isActive={location.pathname.startsWith('/audit')}>
          <NavLink to="/audit">Audit Investigation</NavLink>
        </NavItem>
        <NavItem to="http://localhost:3001/" target="_blank">
          Business Monitoring
        </NavItem>
        <NavItem to="http://localhost:3001/" target="_blank">
          Operational Monitoring
        </NavItem>
      </NavList>
    </Nav>
  );

  const sidebar = <PageSidebar nav={PageNav} isNavOpen={true} theme="dark" />;

  const handleBrandClick = () => ({});

  return (
    <KogitoPageLayout
      PageNav={sidebar}
      BrandSrc={imgBrand}
      BrandAltText="Kogito TrustyAI"
      BrandClick={handleBrandClick}
    >
      <Switch>
        <Route exact path="/">
          <Redirect to="/audit" />
        </Route>
        <Route exact path="/audit">
          <PageSection>audit page content</PageSection>
        </Route>
      </Switch>
    </KogitoPageLayout>
  );
};

export default TrustyApp;