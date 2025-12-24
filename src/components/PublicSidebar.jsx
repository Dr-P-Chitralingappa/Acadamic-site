import React from "react";
import { 
  FaMapMarkerAlt, 
  FaUniversity, 
  FaEnvelope, 
  FaGoogle, 
  FaOrcid, 
  FaGithub 
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="card sidebar">
      <div style={{ padding: '8px 6px' }}>

        <div className="profile-pic-container">
            <img src="/profile.jpeg" alt="Profile" className="profile-pic" />
        </div>


        <div className="links">

          {/* LOCATION */}
          <div>
            <FaMapMarkerAlt className="icon" /> Anantapur, Andhra Pradesh
          </div>

          {/* COLLEGE */}
          <div>
            <FaUniversity className="icon" /> 
            Srinivasa Ramanujan Institute of Technology
          </div>

          {/* EMAIL */}
          <div>
            <FaEnvelope className="icon" /> 
            <a href="mailto:p.chitralingappa@gmail.com">
              p.chitralingappa@gmail.com
            </a>
          </div>

          {/* GOOGLE SCHOLAR */}
          <div>
            <FaGoogle className="icon" /> 
            <a 
              href="https://scholar.google.com/citations?user=QmPOGyIAAAAJ&hl=en&oi=ao"
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar
            </a>
          </div>

          {/* ORCID */}
          <div>
            <FaOrcid className="icon" />
            <a 
              href="https://orcid.org/0000-0003-0125-7126"
              target="_blank"
              rel="noreferrer"
            >
              ORCID
            </a>
          </div>

          {/* Scopus */}
          <div>
            <FaGithub className="icon" /> 
            <a href="https://www.scopus.com/authid/detail.uri?authorId=58141710200" target="_blank" rel="noreferrer">
              Scopus
            </a>
          </div>

          {/* GITHUB */}
          <div>
            <FaGithub className="icon" /> 
            <a href="#" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
