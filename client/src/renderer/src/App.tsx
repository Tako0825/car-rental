import { useRoutes } from 'react-router-dom'
import { routes } from './router'
import { BaseLayout } from './layouts/BaseLayout'

function App(): JSX.Element {
    return <BaseLayout>{useRoutes(routes)}</BaseLayout>
}

export default App
