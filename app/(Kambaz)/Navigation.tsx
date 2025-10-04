import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function KambazNavigation() {
  return (
      <div>
    <ListGroup id="wd-kambaz-navigation"
         style={{ width: 120 }}
         className="rounded-0 position-fixed
                    bottom-0
                    top-0 d-none d-md-block
                    bg-black z-2">
    
    <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/">
       <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
     </ListGroupItem><br />

     <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/Account" id="wd-account-link"
             className="text-white text-decoration-none">
         <FaRegCircleUser className="fs-1 text-white" /><br />
         Account </Link>
     </ListGroupItem><br />

     <ListGroupItem className="border-0
                  bg-white text-center">
     <Link href="/Dashboard" className="text-danger
           text-decoration-none">
       <AiOutlineDashboard
        className="fs-1 text-danger" /><br />
        Dashboard
     </Link>
   </ListGroupItem>

   <ListGroupItem className="border-0
                  bg-white text-center">
     <Link href="/Dashboard" className="text-danger
           text-decoration-none">
       <LiaBookSolid
        className="fs-1 text-danger" /><br />
        Courses
     </Link>
   </ListGroupItem>

   <ListGroupItem className="border-0
                  bg-white text-center">
     <Link href="/Calendar" className="text-danger
           text-decoration-none">
       <IoCalendarOutline
        className="fs-1 text-danger" /><br />
        Calendar
     </Link>
   </ListGroupItem>

   <ListGroupItem className="border-0
                  bg-white text-center">
     <Link href="/Inbox" className="text-danger
           text-decoration-none">
       <FaInbox
        className="fs-1 text-danger" /><br />
        Inbox
     </Link>
   </ListGroupItem>

   <ListGroupItem className="border-0
                  bg-white text-center">
     <Link href="/Labs" className="text-danger
           text-decoration-none">
       <LiaCogSolid
        className="fs-1 text-danger" /><br />
        Labs
     </Link>
   </ListGroupItem>
   </ListGroup>

    </div>
);}
