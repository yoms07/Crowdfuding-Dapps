const { uploadJSONToIPFS, getFactoryContract, getProvider } = require("./utils")
const { v4 } = require("uuid")

function getRandomInteger(lowerBound, upperBound) {
  // Generates a random integer between lowerBound and upperBound (inclusive)
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

function getNDaysFromNow(n) {
  const now = new Date();
  const nDaysLater = new Date(now.getTime() + n * 24 * 60 * 60 * 1000);
  return nDaysLater
}

const initialCrowdfunding = [
  {
    "title": "Bantu Pembangunan Sekolah di Pedalaman Papua",
    "categories": ["Pendidikan"],
    "description": "Proyek ini bertujuan untuk membangun sekolah di pedalaman Papua agar anak-anak dapat memperoleh akses pendidikan yang layak.",
    "target": 500000000
  },
  {
    "title": "Operasi Jantung untuk Bayi Azka",
    "categories": ["Kesehatan"],
    "description": "Bayi Azka membutuhkan operasi jantung segera agar bisa bertahan hidup dan menjalani masa depan yang lebih baik.",
    "target": 200000000
  },
  {
    "title": "Penyediaan Air Bersih di Desa Terpencil NTT",
    "categories": ["Kemanusiaan", "Infrastruktur"],
    "description": "Menggalang dana untuk menyediakan akses air bersih bagi warga desa terpencil di Nusa Tenggara Timur.",
    "target": 150000000
  },
  {
    "title": "Beasiswa untuk Anak Yatim Berprestasi",
    "categories": ["Pendidikan"],
    "description": "Menyediakan beasiswa bagi anak-anak yatim yang berprestasi agar mereka dapat melanjutkan pendidikan hingga perguruan tinggi.",
    "target": 100000000
  },
  {
    "title": "Dukung Pengobatan Ibu Lina yang Terkena Kanker",
    "categories": ["Kesehatan"],
    "description": "Ibu Lina didiagnosis kanker payudara stadium 3 dan membutuhkan dukungan untuk biaya pengobatannya.",
    "target": 250000000
  },
  {
    "title": "Rumah Singgah untuk Anak Jalanan di Jakarta",
    "categories": ["Sosial", "Anak-anak"],
    "description": "Proyek ini bertujuan untuk mendirikan rumah singgah bagi anak-anak jalanan di Jakarta agar mereka memiliki tempat yang aman.",
    "target": 300000000
  },
  {
    "title": "Pembangunan Masjid di Desa Pelosok Sumatra",
    "categories": ["Keagamaan"],
    "description": "Menggalang dana untuk pembangunan masjid di desa terpencil di Sumatra agar warga dapat beribadah dengan nyaman.",
    "target": 400000000
  },
  {
    "title": "Bantu Korban Banjir di Kalimantan Selatan",
    "categories": ["Bencana Alam"],
    "description": "Penggalangan dana untuk menyediakan kebutuhan darurat bagi korban banjir di Kalimantan Selatan.",
    "target": 250000000
  },
  {
    "title": "Pemberdayaan Petani Kopi di Jawa Barat",
    "categories": ["Ekonomi", "Pemberdayaan Masyarakat"],
    "description": "Membantu petani kopi di Jawa Barat meningkatkan kualitas produksi dan akses pasar.",
    "target": 150000000
  },
  {
    "title": "Renovasi Panti Asuhan di Surabaya",
    "categories": ["Sosial", "Anak-anak"],
    "description": "Renovasi panti asuhan di Surabaya agar anak-anak mendapatkan tempat tinggal yang lebih nyaman.",
    "target": 200000000
  },
  {
    "title": "Bantu Pendidikan Anak-anak Nelayan di Maluku",
    "categories": ["Pendidikan"],
    "description": "Menyediakan perlengkapan sekolah dan beasiswa untuk anak-anak nelayan di Maluku.",
    "target": 120000000
  },
  {
    "title": "Operasi Tumor untuk Pak Haris",
    "categories": ["Kesehatan"],
    "description": "Pak Haris membutuhkan operasi pengangkatan tumor untuk memperpanjang hidupnya.",
    "target": 180000000
  },
  {
    "title": "Dukungan Pangan untuk Panti Jompo di Bandung",
    "categories": ["Sosial", "Lansia"],
    "description": "Penggalangan dana untuk menyediakan kebutuhan pangan bagi penghuni panti jompo di Bandung.",
    "target": 100000000
  },
  {
    "title": "Pembangunan Jembatan Desa di Lombok",
    "categories": ["Infrastruktur", "Kemanusiaan"],
    "description": "Proyek pembangunan jembatan di desa terpencil Lombok agar warga memiliki akses yang lebih baik.",
    "target": 350000000
  },
  {
    "title": "Bantu Rehabilitasi Lingkungan Pasca Bencana di Bali",
    "categories": ["Lingkungan", "Bencana Alam"],
    "description": "Proyek untuk memperbaiki dan merehabilitasi lingkungan yang rusak akibat bencana alam di Bali.",
    "target": 220000000
  },
  {
    "title": "Pengadaan Alat Bantu Dengar untuk Anak Tunarungu",
    "categories": ["Kesehatan", "Disabilitas"],
    "description": "Menggalang dana untuk membeli alat bantu dengar bagi anak-anak tunarungu di Indonesia.",
    "target": 170000000
  }
]

const createIndividualCrowdfunding = async ({
  title = "Title",
  categories = ["Sport"],
  description = "Description",
  target = 10_000_000,
  deadline = Math.floor(getNDaysFromNow(getRandomInteger(20, 50)).getTime() / 1000),
  signerIndex = getRandomInteger(3, 15)
}) => {
  const signer = await (await getProvider()).getSigner(signerIndex);
  const contract = await getFactoryContract(signer);
  const cid = await uploadJSONToIPFS({
    description,
    randmon: v4()
  })
  const cf = {
    title,
    description,
    categories,
    cid,
    target,
    deadline
  }
  console.log(cf)

  await contract.createCrowdfunding(
    title,
    description,
    categories,
    cid,
    target,
    deadline
  )

  console.log("Crowdfunding Created")
}

async function createCrowdfunding() {

  for (const cf of initialCrowdfunding) {
    await createIndividualCrowdfunding(cf)
  }

  // await Promise.all([])

  // const title = "titlev2";
  // const categories = ["Sport", "Technology"];
  // const description = "Descriptionv2";
  // const target = 10_000_000;
  // const deadline = Math.floor(getEightDaysFromNow().getTime() / 1000);

  // const signer = await (await getProvider()).getSigner(19);
  // const contract = await getFactoryContract(signer);

  // const cid = await uploadJSONToIPFS({
  //   description,
  //   random: v4(),
  // });

  // console.log(cid)

  // await contract.createCrowdfunding(
  //   title,
  //   description,
  //   categories,
  //   cid,
  //   target,
  //   deadline
  // );
}

createCrowdfunding().catch(console.error);
