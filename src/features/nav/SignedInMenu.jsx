import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();

  //console.log("=====> SignedInMenu, authenticated: " + authenticated);

  async function handleSignout() {
    try {
      await signOutFirebase();
      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing='top left' text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item as={Link} to={`/profile/${currentUserProfile.id}`} text='My Profile' icon='user' />
          <Dropdown.Item as={Link} to='/account' text='My Account' icon='settings' />
          <Dropdown.Item onClick={handleSignout} text='Logout' icon='power' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
