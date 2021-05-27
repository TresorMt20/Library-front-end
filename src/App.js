import { Container } from 'react-bootstrap';
import './App.css';
import Navcomp from './components/Navcomp';
import { Row, Col} from 'react-bootstrap';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Addbook from './components/Addbook';
import Booklist from './components/Booklist';
import Viewbookcomp from './components/Viewbookcomp';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Addtocartcomp from './components/Addtocartcomp';
import ViewCartIremComp from './components/ViewCartIremComp';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Userlist from './components/Userlist';

function App () {

  const marginTop = {
    marginTop: "20px"
  }
  return (
    <Router>
      
    
      <Container>
        <Row>
            <Col lg={12} style={marginTop}>
              <Switch>
                 <Route path="/" exact component={Login}/>
                 <Route path="/add" exact component={Addbook}/>
                 <Route path="/edit/:id" exact component={Addbook}/>
                 <Route path="/list" exact component={Booklist}/>
                 <Route path="/view-book/:id" exact component={Viewbookcomp}/>
                 <Route path="/add-cart/:id" exact component={Addtocartcomp}/>
                 <Route path="/view-cart" exact component={ViewCartIremComp}/>
                 <Route path="/register" exact component={Register}/>
                 <Route path="/log-out" exact component={Login}/>
                 <Route path="/welcome" exact component={Welcome}/>
                 <Route path="/users" exact component={Userlist}/>
              </Switch>
             </Col>
        </Row>
      </Container>
      <Footer/>

      </Router>
  );
}

export default App;
