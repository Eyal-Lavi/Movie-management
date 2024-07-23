import './App.css'
import Menu from './Menu'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './route-config'

import configureValidations from './Validations'
configureValidations();

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <div className='container'>
        <Switch>
          {routes.map(routeVal => 
            <Route path={routeVal.path} exact={routeVal.exact} key={routeVal.path}>
                <routeVal.component />
            </Route>
          )}
        </Switch>
      </div>
      <footer className='bd-footer py-5 mt-5 bg-light'>
        <div className='container'>
          React Movies {new Date().getFullYear().toString()}
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App










//First version

  // return (
  //   <BrowserRouter>
  //     <Menu />
  //     <div className='container'>
  //       <Switch>

  //         <Route exact path='/'>
  //           <h3>In Theaters</h3>
  //           <MoviesList movies={movies.inTheaters} />

  //           <h3>Upcoming Releases</h3>
  //           <MoviesList movies={movies.upcomingReleases} />
  //         </Route>

  //         <Route path='/genres'>
  //             <IndexGenres />
  //         </Route>
          
  //         <Route path='/Some'>
  //             <h1>Some page</h1>
  //         </Route>
  //       </Switch>
  //     </div>
  //   </BrowserRouter>
  // )