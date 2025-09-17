# ELSTAT API Integration

## Περιγραφή

Η υπηρεσία ELSTAT παρέχει πρόσβαση σε ελληνικά στατιστικά στοιχεία από την Ελληνική Στατιστική Αρχή (ΕΛΣΤΑΤ) μέσω του επίσημου API και του πρωτοκόλλου SDMX.

## Χαρακτηριστικά

### 📊 **Διαθέσιμα Δεδομένα**
- **Δείκτης Τιμών Καταναλωτή**: Consumer Price Index (CPI)
- **Ανεργία**: Ποσοστό ανεργίας ανά ηλικία και φύλο
- **ΑΕΠ**: Ακαθάριστο Εγχώριο Προϊόν και αύξηση
- **Λιανικό Εμπόριο**: Κύκλος εργασιών λιανικού εμπορίου
- **Επιχειρηματική Εμπιστοσύνη**: Δείκτης επιχειρηματικής εμπιστοσύνης
- **Βιομηχανική Παραγωγή**: Δείκτης βιομηχανικής παραγωγής
- **Εισαγωγές/Εξαγωγές**: Διεθνές εμπόριο αγαθών
- **Απασχόληση**: Ποσοστό απασχόλησης
- **Κόστος Εργασίας**: Δείκτης κόστους εργασίας
- **Τουρισμός**: Τουριστικές αφίξεις και έσοδα
- **Οικοδομές**: Δείκτης δραστηριότητας οικοδομών
- **Ενέργεια**: Κατανάλωση και ανανεώσιμη ενέργεια

### 🏛️ **Περιφέρειες**
Υποστηρίζει όλες τις περιφέρειες της Ελλάδας:
- Ελλάδα (EL), Αττική (EL-A), Κεντρική Μακεδονία (EL-B)
- Δυτική Μακεδονία (EL-C), Ανατολική Μακεδονία και Θράκη (EL-D)
- Θεσσαλία (EL-E), Ήπειρος (EL-F), Δυτική Ελλάδα (EL-G)
- Στερεά Ελλάδα (EL-H), Πελοπόννησος (EL-J)
- Βόρειο Αιγαίο (EL-K), Νότιο Αιγαίο (EL-L), Κρήτη (EL-M)

## Χρήση

### Βασική Χρήση

```javascript
import elstatService from './elstatService';

// Λήψη δεδομένων πληθωρισμού για την Ελλάδα
const cpiData = await elstatService.getConsumerPriceIndex('12');

// Λήψη δεδομένων ανεργίας
const unemploymentData = await elstatService.getUnemploymentRate('12');

// Λήψη περιφερειακών δεδομένων
const regionalData = await elstatService.getRegionalData('cpi', ['EL-A', 'EL-B'], '12');
```

### Επεξεργασία Δεδομένων

```javascript
// Επεξεργασία ακατέργαστων δεδομένων
const processedData = elstatService.processData(rawData, 'cpi');

// Λήψη επιχειρηματικής ευφυΐας
const businessIntelligence = await elstatService.getBusinessIntelligenceSummary();

// Λήψη κλαδικών δεδομένων
const sectorData = await elstatService.getSectorData('retail', '12');
```

## API Endpoints

### Κύρια Μέθοδοι

- `getConsumerPriceIndex(timeRange)` - Δείκτης τιμών καταναλωτή
- `getUnemploymentRate(timeRange)` - Ποσοστό ανεργίας
- `getRetailTradeTurnover(timeRange)` - Κύκλος εργασιών λιανικού εμπορίου
- `getBusinessConfidence(timeRange)` - Επιχειρηματική εμπιστοσύνη
- `getGDPGrowth(timeRange)` - Αύξηση ΑΕΠ
- `getTradeData(tradeType, timeRange)` - Δεδομένα εμπορίου
- `getTourismData(dataType, timeRange)` - Δεδομένα τουρισμού

### Περιφερειακές Μέθοδοι

- `getRegionalData(indicator, regions, timeRange)` - Περιφερειακά δεδομένα
- `getSectorData(sector, timeRange)` - Κλαδικά δεδομένα

### Βοηθητικές Μέθοδοι

- `processData(rawData, indicator)` - Επεξεργασία δεδομένων
- `getBusinessIntelligenceSummary()` - Σύνοψη επιχειρηματικής ευφυΐας
- `clearCache()` - Καθαρισμός cache
- `getContactInfo()` - Πληροφορίες επικοινωνίας ΕΛΣΤΑΤ

## Cache

Η υπηρεσία χρησιμοποιεί cache για βελτιστοποίηση:
- **Cache Duration**: 1 ώρα (τα δεδομένα ΕΛΣΤΑΤ ενημερώνονται λιγότερο συχνά)
- **Automatic Refresh**: Αυτόματη ανανέωση όταν λήγει το cache
- **Manual Clear**: Δυνατότητα χειροκίνητου καθαρισμού

## Error Handling

```javascript
try {
  const data = await elstatService.getConsumerPriceIndex('12');
} catch (error) {
  console.error('ELSTAT API error:', error.message);
  // Handle error appropriately
}
```

## Παράμετροι

### Χρόνος
- `timeRange`: Αριθμός μηνών προς τα πίσω (π.χ. '12' για 12 μήνες)

### Δείκτες
- `cpi`: Δείκτης τιμών καταναλωτή
- `unemployment`: Ανεργία
- `retail_trade`: Λιανικό εμπόριο
- `business_confidence`: Επιχειρηματική εμπιστοσύνη
- `gdp_growth`: Αύξηση ΑΕΠ
- `imports`: Εισαγωγές
- `exports`: Εξαγωγές
- `tourism_arrivals`: Τουριστικές αφίξεις
- `tourism_revenue`: Τουριστικά έσοδα

### Κλάδοι
- `retail`: Λιανικό εμπόριο
- `tourism`: Τουρισμός
- `construction`: Οικοδομές
- `manufacturing`: Βιομηχανία
- `trade`: Εμπόριο

## React Component

Το `ElstatStatistics` component παρέχει:
- **Επισκόπηση**: Γρήγορη εικόνα των κύριων ελληνικών δεικτών
- **Περιφέρειες**: Σύγκριση περιφερειακών δεδομένων
- **Κλάδοι**: Κλαδικά στατιστικά για επιχειρήσεις
- **Εξαγωγή**: Δυνατότητα εξαγωγής δεδομένων

## Παραδείγματα Χρήσης

### 1. Επισκόπηση Ελλάδας
```javascript
const summary = await elstatService.getBusinessIntelligenceSummary();
console.log(summary.greece.cpi.data[0]); // Τελευταία τιμή πληθωρισμού
```

### 2. Περιφερειακή Σύγκριση
```javascript
const regionalData = await elstatService.getRegionalData('cpi', ['EL-A', 'EL-B', 'EL-M'], '6');
// Σύγκριση πληθωρισμού Αττικής, Κεντρικής Μακεδονίας και Κρήτης
```

### 3. Κλαδικά Δεδομένα
```javascript
const retailData = await elstatService.getSectorData('retail', '12');
const processed = elstatService.processData(retailData, 'retail');
// Δεδομένα λιανικού εμπορίου για 12 μήνες
```

### 4. Τουριστικά Δεδομένα
```javascript
const tourismData = await elstatService.getTourismData('arrivals', '12');
// Τουριστικές αφίξεις για 12 μήνες
```

## SDMX Protocol

Η υπηρεσία υποστηρίζει το πρωτόκολλο SDMX (Statistical Data and Metadata eXchange):
- **XML Parsing**: Αυτόματη μετατροπή SDMX XML σε JSON
- **Metadata Support**: Υποστήριξη μεταδεδομένων
- **Fallback**: Αυτόματη εναλλαγή σε SDMX αν το REST API αποτύχει

## Επικοινωνία με ΕΛΣΤΑΤ

Για τεχνικές λεπτομέρειες και πρόσβαση στο API:
- **Email**: data.dissem@statistics.gr
- **Τηλέφωνο**: 213-135-2022
- **Διεύθυνση**: Πειραιώς 46 και Επονιτών, 185 10 Πειραιάς
- **Website**: https://www.statistics.gr

## Περιορισμοί

- **Rate Limiting**: Το ELSTAT API μπορεί να έχει περιορισμούς στο rate limiting
- **Data Lag**: Τα δεδομένα έχουν καθυστέρηση 1-2 μηνών
- **Availability**: Εξαρτάται από τη διαθεσιμότητα του ELSTAT API
- **SDMX Complexity**: Το πρωτόκολλο SDMX μπορεί να είναι πολύπλοκο για ορισμένα δεδομένα

## Συμβατότητα

- **Browsers**: Όλα τα σύγχρονα browsers
- **React**: 16.8+ (με hooks)
- **Node.js**: 14+ (για server-side χρήση)
- **XML Parsing**: Απαιτείται DOMParser για SDMX

## Άδεια Χρήσης

Τα δεδομένα από την ΕΛΣΤΑΤ είναι δημόσια και διαθέσιμα υπό την άδεια Creative Commons Attribution 4.0 International.

## Διαφορές από Eurostat

- **Γλώσσα**: Ελληνικά δεδομένα και ετικέτες
- **Περιφέρειες**: Εστίαση σε ελληνικές περιφέρειες αντί για ευρωπαϊκές χώρες
- **Κλάδοι**: Ελληνικά κλαδικά στατιστικά
- **SDMX**: Υποστήριξη του πρωτοκόλλου SDMX
- **Cache**: Μεγαλύτερη διάρκεια cache λόγω λιγότερο συχνών ενημερώσεων
