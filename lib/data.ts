import { Commodity, User, ProduceListing, Order, Message, PriceData } from "./types";

export const NIGERIAN_STATES: { name: string; code: string; lgas: string[] }[] = [
  { name: "Abia", code: "AB", lgas: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala-Ngwa North", "Isiala-Ngwa South", "Isuikwuato", "Obioma Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South"] },
  { name: "Adamawa", code: "AD", lgas: ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo-Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"] },
  { name: "Akwa Ibom", code: "AK", lgas: ["Abak", "Eastern Obolo", "Eket", "Esit-Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo-Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"] },
  { name: "Anambra", code: "AN", lgas: ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"] },
  { name: "Bauchi", code: "BA", lgas: ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"] },
  { name: "Bayelsa", code: "BY", lgas: ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"] },
  { name: "Benue", code: "BE", lgas: ["Apa", "Ado", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Oturkpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"] },
  { name: "Borno", code: "BO", lgas: ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"] },
  { name: "Cross River", code: "CR", lgas: ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"] },
  { name: "Delta", code: "DE", lgas: ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "UDU", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"] },
  { name: "Ebonyi", code: "EB", lgas: ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"] },
  { name: "Edo", code: "ED", lgas: ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"] },
  { name: "Ekiti", code: "EK", lgas: ["Ado-Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido-Osi", "Ijero", "Ikere", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"] },
  { name: "Enugu", code: "EN", lgas: ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi-Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo-Uwani"] },
  { name: "FCT", code: "FC", lgas: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"] },
  { name: "Gombe", code: "GO", lgas: ["Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"] },
  { name: "Imo", code: "IM", lgas: ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor-Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji-Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"] },
  { name: "Jigawa", code: "JI", lgas: ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"] },
  { name: "Kaduna", code: "KD", lgas: ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zango Kataf", "Zaria"] },
  { name: "Kano", code: "KN", lgas: ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"] },
  { name: "Katsina", code: "KT", lgas: ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume", "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin-Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"] },
  { name: "Kebbi", code: "KE", lgas: ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"] },
  { name: "Kogi", code: "KO", lgas: ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela-Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"] },
  { name: "Kwara", code: "KW", lgas: ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"] },
  { name: "Lagos", code: "LA", lgas: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"] },
  { name: "Nasarawa", code: "NA", lgas: ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"] },
  { name: "Niger", code: "NI", lgas: ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Muya", "Pailoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"] },
  { name: "Ogun", code: "OG", lgas: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Remo North", "Shagamu", "Yewa North", "Yewa South"] },
  { name: "Ondo", code: "ON", lgas: ["Akoko North East", "Akoko North West", "Akoko South East", "Akoko South West", "Akure North", "Akure South", "Ese-Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"] },
  { name: "Osun", code: "OS", lgas: ["Atakunmosa East", "Atakunmosa West", "Ayedaade", "Ayedire", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Ife Central", "Ife East", "Ife North", "Ife South", "Egbedore", "Ejigbo", "Ilesha East", "Ilesha West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo-Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"] },
  { name: "Oyo", code: "OY", lgas: ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"] },
  { name: "Plateau", code: "PL", lgas: ["Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"] },
  { name: "Rivers", code: "RI", lgas: ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"] },
  { name: "Sokoto", code: "SO", lgas: ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"] },
  { name: "Taraba", code: "TA", lgas: ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kumi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"] },
  { name: "Yobe", code: "YO", lgas: ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"] },
  { name: "Zamfara", code: "ZA", lgas: ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"] },
];

export const COMMODITIES: Commodity[] = [
  { id: "maize", name: "Maize", category: "plant", unit: "tonne" },
  { id: "rice", name: "Rice", category: "plant", unit: "tonne" },
  { id: "sorghum", name: "Sorghum", category: "plant", unit: "tonne" },
  { id: "millet", name: "Millet", category: "plant", unit: "tonne" },
  { id: "wheat", name: "Wheat", category: "plant", unit: "tonne" },
  { id: "oats", name: "Oats", category: "plant", unit: "tonne" },
  { id: "cassava", name: "Cassava", category: "plant", unit: "tonne" },
  { id: "yam", name: "Yam", category: "plant", unit: "tonne" },
  { id: "sweet_potato", name: "Sweet Potato", category: "plant", unit: "tonne" },
  { id: "cocoyam", name: "Cocoyam", category: "plant", unit: "tonne" },
  { id: "irish_potato", name: "Irish Potato", category: "plant", unit: "tonne" },
  { id: "beans", name: "Beans", category: "plant", unit: "tonne" },
  { id: "soybean", name: "Soybean", category: "plant", unit: "tonne" },
  { id: "groundnuts", name: "Groundnuts", category: "plant", unit: "tonne" },
  { id: "cowpea", name: "Cowpea", category: "plant", unit: "tonne" },
  { id: "bambara_nuts", name: "Bambara Nuts", category: "plant", unit: "tonne" },
  { id: "tomato", name: "Tomato", category: "plant", unit: "tonne" },
  { id: "pepper", name: "Pepper", category: "plant", unit: "tonne" },
  { id: "onion", name: "Onion", category: "plant", unit: "tonne" },
  { id: "okra", name: "Okra", category: "plant", unit: "tonne" },
  { id: "cabbage", name: "Cabbage", category: "plant", unit: "tonne" },
  { id: "carrot", name: "Carrot", category: "plant", unit: "tonne" },
  { id: "cucumber", name: "Cucumber", category: "plant", unit: "tonne" },
  { id: "spinach", name: "Spinach", category: "plant", unit: "tonne" },
  { id: "amaranthus", name: "Amaranthus", category: "plant", unit: "tonne" },
  { id: "garden_egg", name: "Garden Egg", category: "plant", unit: "tonne" },
  { id: "banana", name: "Banana", category: "plant", unit: "tonne" },
  { id: "plantain", name: "Plantain", category: "plant", unit: "tonne" },
  { id: "pineapple", name: "Pineapple", category: "plant", unit: "tonne" },
  { id: "mango", name: "Mango", category: "plant", unit: "tonne" },
  { id: "orange", name: "Orange", category: "plant", unit: "tonne" },
  { id: "watermelon", name: "Watermelon", category: "plant", unit: "tonne" },
  { id: "pawpaw", name: "Pawpaw", category: "plant", unit: "tonne" },
  { id: "avocado", name: "Avocado", category: "plant", unit: "tonne" },
  { id: "guava", name: "Guava", category: "plant", unit: "tonne" },
  { id: "coconut", name: "Coconut", category: "plant", unit: "tonne" },
  { id: "cocoa", name: "Cocoa", category: "plant", unit: "tonne" },
  { id: "cashew", name: "Cashew", category: "plant", unit: "tonne" },
  { id: "sesame", name: "Sesame", category: "plant", unit: "tonne" },
  { id: "ginger", name: "Ginger", category: "plant", unit: "tonne" },
  { id: "garlic", name: "Garlic", category: "plant", unit: "tonne" },
  { id: "hibiscus", name: "Hibiscus", category: "plant", unit: "tonne" },
  { id: "shea_products", name: "Shea Products", category: "plant", unit: "tonne" },
  { id: "palm_oil", name: "Palm Oil", category: "plant", unit: "litre" },
  { id: "rubber", name: "Rubber", category: "plant", unit: "tonne" },
  { id: "cotton", name: "Cotton", category: "plant", unit: "tonne" },
  { id: "live_cattle", name: "Live Cattle", category: "animal", unit: "head" },
  { id: "beef", name: "Beef", category: "animal", unit: "kg" },
  { id: "dairy_cattle", name: "Dairy Cattle", category: "animal", unit: "head" },
  { id: "milk", name: "Milk", category: "animal", unit: "litre" },
  { id: "hides_skins", name: "Hides and Skins", category: "animal", unit: "piece" },
  { id: "live_goats", name: "Live Goats", category: "animal", unit: "head" },
  { id: "goat_meat", name: "Goat Meat", category: "animal", unit: "kg" },
  { id: "goat_milk", name: "Goat Milk", category: "animal", unit: "litre" },
  { id: "goat_skins", name: "Goat Skins", category: "animal", unit: "piece" },
  { id: "live_sheep", name: "Live Sheep", category: "animal", unit: "head" },
  { id: "mutton", name: "Mutton", category: "animal", unit: "kg" },
  { id: "sheep_skins", name: "Sheep Skins", category: "animal", unit: "piece" },
  { id: "live_pigs", name: "Live Pigs", category: "animal", unit: "head" },
  { id: "pork", name: "Pork", category: "animal", unit: "kg" },
  { id: "processed_pork", name: "Processed Pork Products", category: "animal", unit: "kg" },
  { id: "broiler", name: "Broiler Chickens", category: "animal", unit: "bird" },
  { id: "layers", name: "Layers", category: "animal", unit: "bird" },
  { id: "cockerels", name: "Cockerels", category: "animal", unit: "bird" },
  { id: "live_birds", name: "Live Birds", category: "animal", unit: "bird" },
  { id: "eggs", name: "Eggs", category: "animal", unit: "crate" },
  { id: "day_old_chicks", name: "Day-Old Chicks", category: "animal", unit: "bird" },
  { id: "turkey", name: "Turkey", category: "animal", unit: "bird" },
  { id: "duck", name: "Duck", category: "animal", unit: "bird" },
  { id: "guinea_fowl", name: "Guinea Fowl", category: "animal", unit: "bird" },
  { id: "catfish", name: "Catfish", category: "animal", unit: "kg" },
  { id: "tilapia", name: "Tilapia", category: "animal", unit: "kg" },
  { id: "mackerel", name: "Mackerel", category: "animal", unit: "kg" },
  { id: "live_fish", name: "Live Fish", category: "animal", unit: "kg" },
  { id: "fresh_fish", name: "Fresh Fish", category: "animal", unit: "kg" },
  { id: "smoked_fish", name: "Smoked Fish", category: "animal", unit: "kg" },
  { id: "dried_fish", name: "Dried Fish", category: "animal", unit: "kg" },
  { id: "poultry", name: "Poultry", category: "animal", unit: "bird" },
  { id: "goats", name: "Goats", category: "animal", unit: "head" },
  { id: "sheep", name: "Sheep", category: "animal", unit: "head" },
  { id: "cattle", name: "Cattle", category: "animal", unit: "head" },
  { id: "fish", name: "Fish", category: "animal", unit: "kg" },
  { id: "honey", name: "Honey", category: "animal", unit: "litre" },
  { id: "beeswax", name: "Beeswax", category: "animal", unit: "kg" },
  { id: "snail", name: "Snail", category: "animal", unit: "kg" },
  { id: "snail_meat", name: "Snail Meat", category: "animal", unit: "kg" },
  { id: "other_livestock", name: "Other Livestock Products", category: "animal", unit: "kg" },
];

export const MOCK_FARMERS: User[] = [
  { id: "f1", role: "farmer", name: "Adebayo Ogundimu", email: "adebayo@farm.com", phone: "+234 803 123 4567", state: "Oyo", lga: "Iseyin", verificationLevel: "trade_verified", rating: 4.8, joinedDate: "2025-03-15" },
  { id: "f2", role: "farmer", name: "Fatima Ibrahim", email: "fatima@farm.com", phone: "+234 805 234 5678", state: "Kaduna", lga: "Zaria", verificationLevel: "trusted", rating: 4.9, joinedDate: "2025-01-20" },
  { id: "f3", role: "farmer", name: "Chukwuemeka Nwosu", email: "chike@farm.com", phone: "+234 806 345 6789", state: "Enugu", lga: "Nsukka", verificationLevel: "identity_verified", rating: 4.5, joinedDate: "2025-05-10" },
  { id: "f4", role: "farmer", name: "Aminu Bello", email: "aminu@farm.com", phone: "+234 807 456 7890", state: "Kano", lga: "Kano Municipal", verificationLevel: "trade_verified", rating: 4.7, joinedDate: "2025-02-28" },
  { id: "f5", role: "farmer", name: "Oluwaseun Adeyemi", email: "seun@farm.com", phone: "+234 808 567 8901", state: "Ondo", lga: "Akure", verificationLevel: "trusted", rating: 4.9, joinedDate: "2024-11-05" },
];

export const MOCK_AGENTS: User[] = [
  { id: "a1", role: "agent", name: "Lagos Agro Services Ltd", email: "info@lagosagro.ng", phone: "+234 801 111 2222", state: "Lagos", lga: "Lagos Mainland", verificationLevel: "trusted", rating: 4.7, joinedDate: "2024-09-01" },
  { id: "a2", role: "agent", name: "Oyo State Marketing Co.", email: "info@oyoagro.ng", phone: "+234 802 222 3333", state: "Oyo", lga: "Ibadan North", verificationLevel: "business_verified", rating: 4.6, joinedDate: "2025-01-10" },
  { id: "a3", role: "agent", name: "Northern Nigeria Aggregators", email: "info@nnagro.ng", phone: "+234 803 333 4444", state: "Kano", lga: "Kano Municipal", verificationLevel: "trade_verified", rating: 4.5, joinedDate: "2025-04-22" },
];

export const MOCK_BUYERS: User[] = [
  { id: "b1", role: "buyer", name: "Lagos Foods & Beverages", email: "procurement@lagosfoods.ng", phone: "+234 901 111 2222", state: "Lagos", lga: "Apapa", verificationLevel: "business_verified", rating: 4.8, joinedDate: "2024-12-01" },
  { id: "b2", role: "buyer", name: "Nigerian Rice Mills Ltd", email: "buying@nigerianrice.ng", phone: "+234 902 222 3333", state: "Kaduna", lga: "Kaduna North", verificationLevel: "trade_verified", rating: 4.6, joinedDate: "2025-03-05" },
  { id: "b3", role: "buyer", name: "Abuja Supermarkets", email: "supply@abujamarts.ng", phone: "+234 903 333 4444", state: "FCT", lga: "Municipal Area Council", verificationLevel: "identity_verified", rating: 4.4, joinedDate: "2025-06-15" },
];

export const MOCK_EXPORTERS: User[] = [
  { id: "e1", role: "exporter", name: "West Africa Export Ltd", email: "exports@wael.ng", phone: "+234 904 111 2222", state: "Lagos", lga: "Lagos Island", verificationLevel: "trusted", rating: 4.9, joinedDate: "2024-08-20" },
  { id: "e2", role: "exporter", name: "Global Agro Nigeria", email: "trading@globalagro.ng", phone: "+234 905 222 3333", state: "Ogun", lga: "Abeokuta South", verificationLevel: "business_verified", rating: 4.7, joinedDate: "2025-02-14" },
];

export const MOCK_PRODUCE: ProduceListing[] = [
  { id: "p1", sellerId: "f1", sellerRole: "farmer", commodityId: "cassava", variety: "TME 419", quantity: 50, price: 85000, currency: "NGN", negotiable: true, grade: "A", location: "Iseyin", state: "Oyo", availableDate: "2026-08-25", harvestDate: "2026-08-20", minOrder: 10, packaging: "50kg woven bags", storageCondition: "Cool, dry store", status: "active", createdAt: "2026-08-20", photos: [] },
  { id: "p2", sellerId: "f2", sellerRole: "farmer", commodityId: "sesame", variety: "White", quantity: 100, price: 220000, currency: "NGN", negotiable: true, grade: "export", location: "Zaria", state: "Kaduna", availableDate: "2026-09-01", harvestDate: "2026-08-15", minOrder: 25, packaging: "50kg bags", storageCondition: "Moisture <8%", status: "active", createdAt: "2026-08-18", photos: [] },
  { id: "p3", sellerId: "a1", sellerRole: "agent", commodityId: "maize", variety: "Yellow Flint", quantity: 200, price: 380000, currency: "NGN", negotiable: false, grade: "B", location: "Lagos", state: "Lagos", availableDate: "2026-08-22", harvestDate: "2026-08-10", minOrder: 50, packaging: "100kg bags", storageCondition: "Dry", status: "active", createdAt: "2026-08-10", photos: [] },
  { id: "p4", sellerId: "f3", sellerRole: "farmer", commodityId: "yam", variety: "White Yam", quantity: 30, price: 120000, currency: "NGN", negotiable: true, grade: "A", location: "Nsukka", state: "Enugu", availableDate: "2026-08-28", harvestDate: "2026-08-22", minOrder: 5, packaging: "100kg baskets", storageCondition: "Barn stored", status: "active", createdAt: "2026-08-22", photos: [] },
  { id: "p5", sellerId: "a2", sellerRole: "agent", commodityId: "rice", variety: "FARO 44", quantity: 150, price: 450000, currency: "NGN", negotiable: true, grade: "A", location: "Ibadan", state: "Oyo", availableDate: "2026-09-05", harvestDate: "2026-08-30", minOrder: 30, packaging: "50kg bags", storageCondition: "Hermetic bags", status: "active", createdAt: "2026-08-15", photos: [] },
  { id: "p6", sellerId: "f4", sellerRole: "farmer", commodityId: "ginger", variety: "Dry Ginger", quantity: 25, price: 180000, currency: "NGN", negotiable: true, grade: "export", location: "Kano", state: "Kano", availableDate: "2026-10-01", harvestDate: "2026-09-15", minOrder: 5, packaging: "50kg jute bags", storageCondition: "Moisture <10%", status: "active", createdAt: "2026-08-12", photos: [] },
  { id: "p7", sellerId: "e1", sellerRole: "exporter", commodityId: "cocoa", variety: "Forastero", quantity: 500, price: 2500000, currency: "NGN", negotiable: true, grade: "export", location: "Ondo", state: "Ondo", availableDate: "2026-11-01", harvestDate: "2026-09-30", minOrder: 100, packaging: "60kg bags", storageCondition: "Dry warehouse", status: "active", createdAt: "2026-08-01", photos: [] },
  { id: "p8", sellerId: "f5", sellerRole: "farmer", commodityId: "cashew", variety: "Raw", quantity: 80, price: 320000, currency: "NGN", negotiable: true, grade: "A", location: "Ondo", state: "Ondo", availableDate: "2026-09-10", harvestDate: "2026-08-25", minOrder: 20, packaging: "50kg bags", storageCondition: "Ventilated", status: "active", createdAt: "2026-08-18", photos: [] },
  { id: "p9", sellerId: "a3", sellerRole: "agent", commodityId: "soybean", variety: "TGX", quantity: 120, price: 280000, currency: "NGN", negotiable: true, grade: "B", location: "Kano", state: "Kano", availableDate: "2026-09-15", harvestDate: "2026-09-01", minOrder: 25, packaging: "50kg bags", storageCondition: "Dry", status: "active", createdAt: "2026-08-14", photos: [] },
  { id: "p10", sellerId: "f1", sellerRole: "farmer", commodityId: "tomato", variety: "Roma", quantity: 15, price: 45000, currency: "NGN", negotiable: true, grade: "A", location: "Iseyin", state: "Oyo", availableDate: "2026-08-26", harvestDate: "2026-08-23", minOrder: 2, packaging: "25kg crates", storageCondition: "Cold chain", status: "active", createdAt: "2026-08-23", photos: [] },
];

export const MOCK_ORDERS: Order[] = [
  { id: "AGN-2026-000145", produceId: "p1", buyerId: "b1", sellerId: "f1", quantity: 20, price: 85000, deliveryLocation: "Lagos", status: "processing", createdAt: "2026-08-21", updatedAt: "2026-08-23", notes: "Please load on trailer" },
  { id: "AGN-2026-000146", produceId: "p2", buyerId: "b2", sellerId: "f2", quantity: 50, price: 220000, deliveryLocation: "Kaduna", status: "paid", createdAt: "2026-08-22", updatedAt: "2026-08-22" },
  { id: "AGN-2026-000147", produceId: "p3", buyerId: "b3", sellerId: "a1", quantity: 100, price: 380000, deliveryLocation: "Abuja", status: "requested", createdAt: "2026-08-23", updatedAt: "2026-08-23" },
];

export const MOCK_MESSAGES: Message[] = [
  { id: "m1", senderId: "b1", receiverId: "f1", content: "Is the cassava available for immediate collection?", timestamp: "2026-08-23T10:30:00Z", read: true },
  { id: "m2", senderId: "f1", receiverId: "b1", content: "Yes, it is ready. When do you need it?", timestamp: "2026-08-23T10:35:00Z", read: true },
  { id: "m3", senderId: "b1", receiverId: "f1", content: "We can pick up tomorrow morning.", timestamp: "2026-08-23T10:40:00Z", read: false },
];

export const MOCK_PRICES: PriceData[] = [
  { commodityId: "maize", state: "Lagos", price: 85000, change: 2500, changePercent: 3.03, date: "2026-08-24" },
  { commodityId: "maize", state: "Kaduna", price: 78000, change: -1200, changePercent: -1.52, date: "2026-08-24" },
  { commodityId: "maize", state: "Oyo", price: 82000, change: 1800, changePercent: 2.24, date: "2026-08-24" },
  { commodityId: "rice", state: "Lagos", price: 95000, change: 1500, changePercent: 1.60, date: "2026-08-24" },
  { commodityId: "rice", state: "Kaduna", price: 89000, change: 500, changePercent: 0.56, date: "2026-08-24" },
  { commodityId: "cassava", state: "Oyo", price: 85000, change: 3000, changePercent: 3.66, date: "2026-08-24" },
  { commodityId: "cassava", state: "Enugu", price: 90000, change: 2000, changePercent: 2.27, date: "2026-08-24" },
  { commodityId: "yam", state: "Enugu", price: 120000, change: 4000, changePercent: 3.45, date: "2026-08-24" },
  { commodityId: "sesame", state: "Kaduna", price: 220000, change: 8000, changePercent: 3.77, date: "2026-08-24" },
  { commodityId: "ginger", state: "Kano", price: 180000, change: -5000, changePercent: -2.70, date: "2026-08-24" },
  { commodityId: "soybean", state: "Kano", price: 130000, change: 3500, changePercent: 2.76, date: "2026-08-24" },
  { commodityId: "cocoa", state: "Ondo", price: 2500000, change: 50000, changePercent: 2.04, date: "2026-08-24" },
  { commodityId: "cashew", state: "Ondo", price: 320000, change: 12000, changePercent: 3.90, date: "2026-08-24" },
  { commodityId: "beans", state: "Kaduna", price: 95000, change: 2000, changePercent: 2.15, date: "2026-08-24" },
  { commodityId: "palm_oil", state: "Enugu", price: 1200, change: 50, changePercent: 4.35, date: "2026-08-24" },
];

export const MOCK_AGGREGATIONS: { agentId: string; farmerId: string; produceId: string; quantity: number; grade: string; date: string }[] = [
  { agentId: "a1", farmerId: "f1", produceId: "p3", quantity: 200, grade: "B", date: "2026-08-10" },
  { agentId: "a2", farmerId: "f4", produceId: "p5", quantity: 150, grade: "A", date: "2026-08-15" },
  { agentId: "a3", farmerId: "f2", produceId: "p9", quantity: 120, grade: "B", date: "2026-08-14" },
];

export function getStateName(code: string): string {
  const state = NIGERIAN_STATES.find(s => s.code === code);
  return state?.name || code;
}

export function getCommodityName(id: string): string {
  return COMMODITIES.find(c => c.id === id)?.name || id;
}

export function formatPrice(amount: number, currency: string = "NGN"): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}
