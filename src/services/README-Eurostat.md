# Eurostat API Integration

## Περιγραφή

Η υπηρεσία Eurostat παρέχει πρόσβαση σε οικονομικά στατιστικά στοιχεία από την Στατιστική Υπηρεσία της Ευρωπαϊκής Ένωσης μέσω του επίσημου API τους.

## Χαρακτηριστικά

### 📊 **Διαθέσιμα Δεδομένα**
- **Πληθωρισμός**: Harmonised Index of Consumer Prices (HICP)
- **Ανεργία**: Ποσοστό ανεργίας ανά ηλικία και φύλο
- **ΑΕΠ**: Ακαθάριστο Εγχώριο Προϊόν και κύρια στοιχεία
- **Λιανικό Εμπόριο**: Δείκτης όγκου λιανικού εμπορίου
- **Επιχειρηματική Εμπιστοσύνη**: Δείκτης επιχειρηματικής εμπιστοσύνης
- **Βιομηχανική Παραγωγή**: Δείκτης βιομηχανικής παραγωγής
- **Εισαγωγές/Εξαγωγές**: Διεθνές εμπόριο αγαθών
- **Απασχόληση**: Ποσοστό απασχόλησης
- **Κόστος Εργασίας**: Δείκτης κόστους εργασίας
- **Τιμές Παραγωγού**: Δείκτης τιμών παραγωγού

### 🌍 **Χώρες**
Υποστηρίζει όλες τις χώρες-μέλη της ΕΕ:
- Ελλάδα (EL), Γερμανία (DE), Γαλλία (FR), Ιταλία (IT)
- Ισπανία (ES), Ολλανδία (NL), Βέλγιο (BE), Αυστρία (AT)
- Πορτογαλία (PT), Φινλανδία (FI), Ιρλανδία (IE) και άλλες

## Χρήση

### Βασική Χρήση

```javascript
import eurostatService from './eurostatService';

// Λήψη δεδομένων πληθωρισμού για την Ελλάδα
const inflationData = await eurostatService.getInflationData(['EL'], '12');

// Λήψη δεδομένων ανεργίας
const unemploymentData = await eurostatService.getUnemploymentData(['EL'], '12');

// Σύγκριση πολλαπλών χωρών
const comparisonData = await eurostatService.getComparativeData('inflation', ['EL', 'DE', 'FR'], '12');
```

### Επεξεργασία Δεδομένων

```javascript
// Επεξεργασία ακατέργαστων δεδομένων
const processedData = eurostatService.processData(rawData, 'inflation');

// Λήψη επιχειρηματικής ευφυΐας
const businessIntelligence = await eurostatService.getBusinessIntelligenceSummary();
```

## API Endpoints

### Κύρια Μέθοδοι

- `getInflationData(countries, timeRange)` - Δεδομένα πληθωρισμού
- `getUnemploymentData(countries, timeRange)` - Δεδομένα ανεργίας
- `getRetailTradeData(countries, timeRange)` - Δεδομένα λιανικού εμπορίου
- `getBusinessConfidenceData(countries, timeRange)` - Επιχειρηματική εμπιστοσύνη
- `getTradeData(countries, timeRange, tradeType)` - Δεδομένα εμπορίου
- `getComparativeData(indicator, countries, timeRange)` - Συγκριτικά δεδομένα

### Βοηθητικές Μέθοδοι

- `processData(rawData, indicator)` - Επεξεργασία δεδομένων
- `getBusinessIntelligenceSummary()` - Σύνοψη επιχειρηματικής ευφυΐας
- `getEUComparison(indicator)` - Σύγκριση με άλλες ΕΕ χώρες
- `clearCache()` - Καθαρισμός cache

## Cache

Η υπηρεσία χρησιμοποιεί cache για βελτιστοποίηση:
- **Cache Duration**: 30 λεπτά
- **Automatic Refresh**: Αυτόματη ανανέωση όταν λήγει το cache
- **Manual Clear**: Δυνατότητα χειροκίνητου καθαρισμού

## Error Handling

```javascript
try {
  const data = await eurostatService.getInflationData(['EL']);
} catch (error) {
  console.error('Eurostat API error:', error.message);
  // Handle error appropriately
}
```

## Παράμετροι

### Χώρες
- `countries`: Array με κωδικούς χωρών (π.χ. ['EL', 'DE', 'FR'])
- `timeRange`: Αριθμός μηνών προς τα πίσω (π.χ. '12' για 12 μήνες)

### Δείκτες
- `inflation`: Πληθωρισμός
- `unemployment`: Ανεργία
- `retail_trade`: Λιανικό εμπόριο
- `business_confidence`: Επιχειρηματική εμπιστοσύνη
- `imports`: Εισαγωγές
- `exports`: Εξαγωγές

## React Component

Το `EurostatStatistics` component παρέχει:
- **Επισκόπηση**: Γρήγορη εικόνα των κύριων δεικτών
- **Σύγκριση**: Σύγκριση με άλλες ΕΕ χώρες
- **Εξαγωγή**: Δυνατότητα εξαγωγής δεδομένων

## Παραδείγματα Χρήσης

### 1. Επισκόπηση Ελλάδας
```javascript
const summary = await eurostatService.getBusinessIntelligenceSummary();
console.log(summary.greece.inflation.data[0]); // Τελευταία τιμή πληθωρισμού
```

### 2. Σύγκριση με Γερμανία
```javascript
const comparison = await eurostatService.getComparativeData('inflation', ['EL', 'DE'], '6');
// Σύγκριση πληθωρισμού Ελλάδας-Γερμανίας για 6 μήνες
```

### 3. Εξαγωγή Δεδομένων
```javascript
const tradeData = await eurostatService.getTradeData(['EL'], '12', 'exports');
const processed = eurostatService.processData(tradeData, 'exports');
// Εξαγωγές Ελλάδας για 12 μήνες
```

## Περιορισμοί

- **Rate Limiting**: Το Eurostat API έχει περιορισμούς στο rate limiting
- **Data Lag**: Τα δεδομένα έχουν καθυστέρηση 1-2 μηνών
- **Availability**: Εξαρτάται από τη διαθεσιμότητα του Eurostat API

## Συμβατότητα

- **Browsers**: Όλα τα σύγχρονα browsers
- **React**: 16.8+ (με hooks)
- **Node.js**: 14+ (για server-side χρήση)

## Άδεια Χρήσης

Τα δεδομένα από το Eurostat είναι δημόσια και διαθέσιμα υπό την άδεια Creative Commons Attribution 4.0 International.
