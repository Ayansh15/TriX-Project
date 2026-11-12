import io
import zipfile
import unittest

from app.processing import extract_upload, price_matches, read_docx, read_xlsx


class ExtractionTests(unittest.TestCase):
    def test_price_match_includes_location_basis_and_ignores_current_value(self):
        text = "[Page 3] Our monthly plan costs ₹499. The new plan costs ₹599 per month."
        matches = price_matches(text, "₹599/month")
        self.assertEqual(len(matches), 1)
        self.assertEqual(matches[0]["value"], "₹499")
        self.assertEqual(matches[0]["location"], "Page 3")
        self.assertIn("plan/month", matches[0]["basis"])

    def test_csv_extraction_uses_available_parser_and_keeps_campaign_text(self):
        text, status, method = extract_upload("campaign.csv", "text/csv", b"Asset,Copy\nLaunch,Plan is INR 499/month")
        self.assertIn("INR 499/month", text)
        self.assertEqual(status, "Indexed")
        self.assertTrue("CSV" in method or "csv" in method)

    def test_docx_extracts_paragraph_text(self):
        payload = io.BytesIO()
        with zipfile.ZipFile(payload, "w") as archive:
            archive.writestr("word/document.xml", """<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Campaign says ₹499 per month</w:t></w:r></w:p></w:body></w:document>""")
        extracted, method = read_docx(payload.getvalue())
        self.assertIn("₹499", extracted)
        self.assertEqual(method, "OpenXML DOCX extraction")

    def test_xlsx_extracts_values_and_sheet_row_location(self):
        payload = io.BytesIO()
        with zipfile.ZipFile(payload, "w") as archive:
            archive.writestr("xl/workbook.xml", """<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Campaigns" sheetId="1" r:id="rId1"/></sheets></workbook>""")
            archive.writestr("xl/_rels/workbook.xml.rels", """<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="worksheet" Target="worksheets/sheet1.xml"/></Relationships>""")
            archive.writestr("xl/sharedStrings.xml", """<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><si><t>Monthly plan</t></si><si><t>₹499/month</t></si></sst>""")
            archive.writestr("xl/worksheets/sheet1.xml", """<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="2"><c r="A2" t="s"><v>0</v></c><c r="B2" t="s"><v>1</v></c></row></sheetData></worksheet>""")
        extracted, method = read_xlsx(payload.getvalue())
        self.assertIn("₹499/month", extracted)
        self.assertIn("Sheet Campaigns · Row 2", extracted)
        self.assertEqual(method, "OpenXML workbook extraction")

    def test_malformed_pdf_returns_actionable_validation_error(self):
        with self.assertRaisesRegex(ValueError, "Could not read PDF"):
            extract_upload("broken.pdf", "application/pdf", b"not a PDF")


if __name__ == "__main__":
    unittest.main()

