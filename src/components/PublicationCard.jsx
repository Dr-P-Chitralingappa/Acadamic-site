export default function PublicationCard({ pub }) {
  return (
    <li
      className="
        list-none mb-6 p-6
        rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition-all hover:scale-[1.01]
      "
    >
      <h3 className="text-lg font-semibold text-indigo-200 leading-snug">
        {pub.title}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {pub.publisher}
        {pub.year ? ` • ${pub.year}` : ""}
      </p>

      {pub.doi && (
        <p className="mt-2 text-sm text-slate-300 break-all">
          <span className="font-medium text-slate-400">DOI:</span>{" "}
          <a
            href={
              pub.doi.startsWith("http")
                ? pub.doi
                : `https://doi.org/${pub.doi}`
            }
            target="_blank"
            rel="noreferrer"
            className="text-indigo-300 hover:text-indigo-400 underline underline-offset-2"
          >
            {pub.doi}
          </a>
        </p>
      )}

      {pub.issn_isbn && (
        <p className="mt-1 text-sm text-slate-300">
          <span className="font-medium text-slate-400">ISSN / ISBN:</span>{" "}
          {pub.issn_isbn}
        </p>
      )}

      {/*
        PDF download/view intentionally disabled.
        This is kept commented to preserve logic
        without rendering any PDF-related UI.

        {pub.pdf_url && (
          <div className="mt-4">
            <a
              href={pub.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block px-4 py-2 rounded-lg
                text-sm font-semibold text-white
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                hover:scale-105 transition-all
              "
            >
              View / Download PDF
            </a>
          </div>
        )}
      */}
    </li>
  );
}
