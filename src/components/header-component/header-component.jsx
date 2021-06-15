import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

const Header = ({ currentUser, hidden }) => {
   return (
      <div className="header">
         <Link to="/" className="logo-container">
            <Logo className="logo"></Logo>
         </Link>
         <div className="options">
            <Link className="option" to="/shop">
               Shop
            </Link>
            <Link className="option" to="/shop">
               Contact
            </Link>

            {currentUser ? (
               <div className="option" onClick={() => auth.signOut()}>
                  Sign Out
               </div>
            ) : (
               <Link className="option" to="/signin">
                  {" "}
                  Sign In
               </Link>
            )}

            <CartIcon />
         </div>
         {hidden ? null : <CartDropDown />}
      </div>
   );
};

// const mapStateToProps = (state) => ({
//    currentUser: selectCurrentUser(state),
//    hidden: selectCartHidden(state),
// });

//createSturucturedSelector takes the top state so need to pass state as function
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
