import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  GraduationCap,
  IdCard,
  Database,
  Github,
  MapPin,
  Building2,
  Mail,
} from "lucide-react";

export default function Home() {
  const [stats, setStats] = useState({
    journals: 0,
    conferences: 0,
    patents: 0,
    books: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [
        journals,
        conferences,
        patents,
        books,
      ] = await Promise.all([
        supabase
          .from("publications")
          .select("*", { count: "exact", head: true })
          .eq("type", "journal"),

        supabase
          .from("publications")
          .select("*", { count: "exact", head: true })
          .eq("type", "conference"),

        supabase.from("patents").select("*", { count: "exact", head: true }),
        supabase.from("books").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        journals: journals.count ?? 0,
        conferences: conferences.count ?? 0,
        patents: patents.count ?? 0,
        books: books.count ?? 0,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[320px_1fr] gap-14">

        {/* PROFILE CARD */}
        <aside className="sticky top-24 h-fit">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 text-center">
            <img
              src="/profile.jpeg"
              alt="Dr. P. Chitralingappa"
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />

            <h3 className="mt-5 text-xl font-bold">
              Dr. P. Chitralingappa
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Associate Professor & Head<br />
              CSE (Data Science)
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-300 text-left">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Anantapur, Andhra Pradesh
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                Srinivasa Ramanujan Institute of Technology
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                p.chitralingappa@gmail.com
              </div>
            </div>

            {/* LINKS */}
            <div className="mt-8 border-t border-white/10 pt-6 space-y-3 text-sm text-left">
              <a
                href="https://scholar.google.com/citations?user=QmPOGyIAAAAJ&hl=en"
                target="_blank"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <GraduationCap size={16} /> Google Scholar
              </a>

              <a
                href="https://orcid.org/0000-0003-0125-7126"
                target="_blank"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <IdCard size={16} /> ORCID
              </a>

              <a
                href="https://www.scopus.com/authid/detail.uri?authorId=58141710200"
                target="_blank"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <Database size={16} /> Scopus
              </a>

               <a
                href="https://vidwan.inflibnet.ac.in/profile/456964"
                target="_blank"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <Database size={16} /> Vidwan
              </a>

              <a
                href="https://github.com/Dr-P-Chitralingappa/"
                target="_blank"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <Github size={16} /> GitHub
              </a>

             
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main>
          <p className="mt-6 text-slate-300 leading-relaxed text-lg md:text-xl max-w-5xl text-justify">
            I am an academician and researcher with over a decade of experience in
            teaching and research. I hold a Ph.D. degree in Computer Science &
            Technology (2021) from Sri Krishnadevaraya University, M.Tech in
            Computer Science and Engineering (2014), and a B.Tech in Computer
            Science and Engineering (2011).
            <br /><br />
            My academic and research interests span Wireless Sensor Networks,
            Network Security, IoT, Artificial Intelligence, Machine Learning and
            Drone Technologies.
            <br /><br />
            I am actively involved in scholarly publishing, patent development,
            mentoring undergraduate and postgraduate students, and contributing
            to funded research initiatives. My work emphasizes research-driven
            teaching, innovation, and the application of emerging technologies
            to real-world problems.
          </p>

          {/* STATS */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold text-slate-200 mb-8">
              Academic Impact & Contributions
            </h3>

            {loading ? (
              <p className="text-slate-400">Loading academic metrics…</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20
                                border border-white/10 rounded-2xl p-8 shadow-xl hover:scale-105 transition">
                  <h4 className="text-2xl font-extrabold text-indigo-300">
                    {stats.journals} Journals
                  </h4>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20
                                border border-white/10 rounded-2xl p-8 shadow-xl hover:scale-105 transition">
                  <h4 className="text-2xl font-extrabold text-purple-300">
                    {stats.conferences} Conferences
                  </h4>
                </div>

                <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20
                                border border-white/10 rounded-2xl p-8 shadow-xl hover:scale-105 transition">
                  <h4 className="text-2xl font-extrabold text-pink-300">
                    {stats.patents} Patents
                  </h4>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/20
                                border border-white/10 rounded-2xl p-8 shadow-xl hover:scale-105 transition">
                  <h4 className="text-2xl font-extrabold text-cyan-300">
                    {stats.books} Books
                  </h4>
                </div>

              <div className="bg-gradient-to-br from-slate-500/20 to-slate-600/20
                border border-white/10 rounded-2xl p-8 shadow-xl">
  <h4 className="text-2xl font-extrabold text-slate-300 mb-2">
    Awards
  </h4>

  <p className="text-slate-400 text-sm leading-relaxed">
    Adjunct Research Scientist<br />
    Young Scientist Award
  </p>
</div>


<div className="bg-gradient-to-br from-slate-500/20 to-slate-600/20
                border border-white/10 rounded-2xl p-8 shadow-xl">
  <h4 className="text-2xl font-extrabold text-slate-300 mb-2">
    Memberships
  </h4>

  <p className="text-slate-400 text-sm leading-relaxed">
    MIE,AMIEE <br />
    Internet Society
  </p>
</div>


              </div>
            )}
          </section>
        </main>
      </div>

      <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Dr. P. Chitralingappa · Academic Portfolio
      </footer>
    </div>
  );
}
