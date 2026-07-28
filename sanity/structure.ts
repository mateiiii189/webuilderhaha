import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("post").title(
        "Posts",
      ),

      S.documentTypeListItem("review").title(
        "Reviews",
      ),

      S.documentTypeListItem(
        "portfolioProject",
      ).title("Proiecte portofoliu"),
    ]);