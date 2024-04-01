import { Api } from '@/api/Api';

export async function GET(req: Request) {
  // Fetch the Excel blob from your endpoint
  const excelBlob = await Api.Wish.exportExcel();

  // Send the Excel blob as the response
  return new Response(excelBlob, {
    // Set the appropriate headers for Excel file
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="Comfy-Wishlist-${new Date().toISOString()}.xlsx"`,
    },
  });
}
