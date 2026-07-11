import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Lipsește NEXT_PUBLIC_SANITY_PROJECT_ID în .env.local");
}

if (!token) {
  throw new Error("Lipsește SANITY_WRITE_TOKEN în .env.local");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const NEW_POST_ID = "post-website-profesional-firma-2026";
const CATEGORY_ID = "category-website-business";
const AUTHOR_ID = "author-webuilder";

function key() {
  return Math.random().toString(36).slice(2, 12);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function paragraph(text: string) {
  return {
    _key: key(),
    _type: "block",
    style: "normal",
    children: [
      {
        _key: key(),
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

function heading(text: string) {
  return {
    _key: key(),
    _type: "block",
    style: "h2",
    children: [
      {
        _key: key(),
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

function bullet(text: string) {
  return {
    _key: key(),
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [
      {
        _key: key(),
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

async function uploadImageFromUrl(url: string, filename: string) {
  console.log(`Uploading image: ${filename}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Nu am putut descărca imaginea: ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: response.headers.get("content-type") || "image/jpeg",
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function createCategoryAndAuthor() {
  await client.createIfNotExists({
    _id: CATEGORY_ID,
    _type: "category",
    title: "Website Business",
    slug: {
      _type: "slug",
      current: "website-business",
    },
  });

  await client.createIfNotExists({
    _id: AUTHOR_ID,
    _type: "author",
    name: "Webuilder",
    role: "Web design & SEO",
  });
}

async function deleteOldPosts() {
  console.log("Searching old posts...");

  const oldPosts = await client.fetch<{ _id: string; title?: string }[]>(
    `*[_type == "post" && _id != $newPostId] { _id, title }`,
    {
      newPostId: NEW_POST_ID,
    }
  );

  if (oldPosts.length === 0) {
    console.log("No old posts to delete.");
    return;
  }

  console.log(`Deleting ${oldPosts.length} old posts...`);

  for (const post of oldPosts) {
    await client.delete(post._id);
    console.log(`Deleted: ${post.title || post._id}`);
  }
}

async function createNewPost() {
  const title =
    "De ce are nevoie o firmă de un website profesional în 2026";

  const slug = slugify(title);

  const coverImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
    "website-profesional-firma-2026-cover.jpg"
  );

  const strategyImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80",
    "strategie-website-business.jpg"
  );

  const designImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=80",
    "design-website-modern.jpg"
  );

  const performanceImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&auto=format&fit=crop&q=80",
    "performanta-website.jpg"
  );

  const doc = {
    _id: NEW_POST_ID,
    _type: "post",
    title,
    slug: {
      _type: "slug",
      current: slug,
    },
    excerpt:
      "Un website profesional nu mai este doar o carte de vizită online. Pentru o firmă modernă, site-ul este locul unde se construiește încrederea, se explică serviciile și se transformă vizitatorii în cereri reale.",
    seoDescription:
      "Află de ce o firmă are nevoie de un website profesional în 2026, ce trebuie să includă un site modern și cum poate ajuta la imagine, SEO și conversii.",
    publishedAt: new Date().toISOString(),
    readingTime: 7,
    postType: "seo",
    isPinned: true,
    coverImage,
    category: {
      _type: "reference",
      _ref: CATEGORY_ID,
    },
    author: {
      _type: "reference",
      _ref: AUTHOR_ID,
    },
    body: [
      paragraph(
        "În 2026, primul contact dintre un client și o firmă se întâmplă de multe ori online. Chiar dacă recomandarea vine dintr-o conversație, din social media sau de la un client vechi, oamenii caută aproape instant firma pe Google și intră pe website înainte să ia o decizie."
      ),
      paragraph(
        "Un website profesional nu este doar despre design. Este despre claritate, încredere, structură și conversie. Un site bun trebuie să explice rapid cine ești, ce oferi, cui te adresezi și de ce clientul ar trebui să te contacteze."
      ),

      heading("Website-ul este prima impresie a firmei"),
      paragraph(
        "Pentru multe firme, website-ul este primul element pe care clientul îl vede înainte să trimită un mesaj sau să ceară o ofertă. Dacă site-ul pare vechi, greu de folosit sau neclar, clientul poate presupune că și firma funcționează la fel."
      ),
      paragraph(
        "Un website modern transmite ordine, seriozitate și atenție la detalii. Chiar dacă firma oferă servicii bune, o prezentare slabă poate reduce încrederea înainte ca discuția să înceapă."
      ),

      strategyImage,

      heading("Un site bun trebuie să explice oferta clar"),
      paragraph(
        "Mulți vizitatori nu au răbdare să caute informații. Ei vor să înțeleagă rapid ce servicii oferi, cât de potrivite sunt pentru ei și ce pas trebuie să facă mai departe."
      ),
      paragraph(
        "De aceea, structura paginii este foarte importantă. Un website eficient nu aruncă toate informațiile la întâmplare, ci le organizează într-un traseu logic: problemă, soluție, servicii, beneficii, proces, încredere și contact."
      ),

      bullet("Titlu clar în prima secțiune a paginii."),
      bullet("Descriere scurtă, directă și orientată spre client."),
      bullet("Servicii explicate pe înțelesul publicului țintă."),
      bullet("Butoane de acțiune vizibile și ușor de folosit."),
      bullet("Formular de contact sau opțiune rapidă de WhatsApp."),

      heading("Designul trebuie să susțină vânzarea, nu doar să arate bine"),
      paragraph(
        "Un design frumos nu este suficient dacă nu ajută clientul să înțeleagă mai repede informația. Designul unui website de firmă trebuie să fie curat, coerent și gândit pentru acțiune."
      ),
      paragraph(
        "Culorile, spațiile, cardurile, secțiunile și animațiile trebuie să conducă vizitatorul spre următorul pas. Un website încărcat sau confuz poate arăta interesant, dar poate pierde conversii."
      ),

      designImage,

      heading("SEO începe din structura website-ului"),
      paragraph(
        "Optimizarea SEO nu înseamnă doar articole pe blog. SEO începe din felul în care este construit site-ul: titluri, descrieri, URL-uri, heading-uri, viteză, imagini optimizate și structură internă logică."
      ),
      paragraph(
        "Un site construit corect poate ajuta Google să înțeleagă mai bine ce oferă firma. Asta nu garantează poziții instant, dar pune o fundație mult mai bună pentru creștere pe termen lung."
      ),

      bullet("URL-uri curate pentru pagini și servicii."),
      bullet("Meta title și meta description pentru paginile importante."),
      bullet("Heading-uri folosite corect, nu doar pentru aspect."),
      bullet("Sitemap și robots configurate corect."),
      bullet("Imagini optimizate pentru viteză și indexare."),

      heading("Viteza site-ului influențează încrederea"),
      paragraph(
        "Un website lent transmite frustrare. Pe telefon, diferența dintre un site care se încarcă rapid și unul care se mișcă greu poate decide dacă vizitatorul rămâne sau pleacă."
      ),
      paragraph(
        "Viteza contează atât pentru experiența utilizatorului, cât și pentru SEO. De aceea, un website modern trebuie să fie construit cu atenție la imagini, cod, hosting și performanță."
      ),

      performanceImage,

      heading("Un website profesional trebuie să genereze cereri"),
      paragraph(
        "Scopul final al unui website de firmă nu este doar să existe online. Scopul este să ajute firma să primească cereri, apeluri, mesaje sau programări."
      ),
      paragraph(
        "Pentru asta, paginile trebuie să aibă call-to-action-uri clare, secțiuni care răspund obiecțiilor și elemente care cresc încrederea: review-uri, portofoliu, proces, întrebări frecvente și explicații clare."
      ),

      heading("Ce ar trebui să includă un website de firmă în 2026"),
      bullet("Homepage clar, cu mesaj puternic și CTA vizibil."),
      bullet("Pagini de servicii separate pentru ofertele importante."),
      bullet("Secțiune despre procesul de lucru."),
      bullet("Review-uri sau exemple de proiecte."),
      bullet("FAQ pentru întrebările frecvente ale clienților."),
      bullet("Pagină de contact simplă, cu formular și date clare."),
      bullet("Pagini legale: confidențialitate, cookies și GDPR."),

      heading("Concluzie"),
      paragraph(
        "Un website profesional este o investiție în imaginea și credibilitatea firmei. Nu este doar o pagină online, ci un sistem care explică, convinge și direcționează vizitatorul spre contact."
      ),
      paragraph(
        "Pentru firmele care vor să fie luate în serios online, să apară mai bine în Google și să transforme vizitatorii în cereri reale, un website construit strategic este una dintre cele mai importante fundații digitale."
      ),
    ],
  };

  await client.createOrReplace(doc);

  console.log("Created new article:");
  console.log(title);
  console.log(`/blog/${slug}`);
}

async function resetBlog() {
  console.log("Starting blog reset...");

  await createCategoryAndAuthor();
  await createNewPost();
  await deleteOldPosts();

  console.log("Done. Blog reset complete.");
  console.log("Sanity now keeps only the new article.");
}

resetBlog().catch((error) => {
  console.error("Reset failed:");
  console.error(error);
  process.exit(1);
});