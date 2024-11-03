import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface Deal {
  id: number;
  name: string;
  discount: string;
  description: string;
}

interface ChatResponse {
  text: string;
  products?: Product[];
  deals?: Deal[];
}

export async function POST(req: Request) {
  try {
    const { message, products, deals } = await req.json();

    //  natural context for Gemini
    const context = `
You are a helpful shopping assistant. Respond naturally to help customers find products and deals.
Available products and deals are:

Products:
${products.map((p: Product) => `- ${p.name}: $${p.price} - ${p.description}`).join('\n')}

Deals:
${deals.map((d: Deal) => `- ${d.name}: ${d.discount} - ${d.description}`).join('\n')}

User query: ${message}

Important: Your response should help the customer find relevant products or deals based on their query.
If they ask about specific products, recommend matching items from the available products.
If they ask about deals or discounts, share relevant deals.

Format your response with a conversational message followed by ###JSON### and a JSON object containing:
{
  "text": "Your conversational response",
  "products": [array of product IDs that match the query],
  "deals": [array of deal IDs that match the query]
}`;

    //  thisgenerates response
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(context);
    const response = result.response.text();
    
    
    const jsonMatch = response.match(/###JSON###\s*({[\s\S]*})/);
    
    if (!jsonMatch) {
      return NextResponse.json({
        text: "I understand your question, but let me try to provide a better response. Could you rephrase your question?",
      });
    }

    try {
      const parsedResponse = JSON.parse(jsonMatch[1]);
      
      // productsfilter
      const chatResponse: ChatResponse = {
        text: parsedResponse.text,
        products: parsedResponse.products 
          ? products.filter((p: Product) => 
              parsedResponse.products.includes(p.id))
          : undefined,
        deals: parsedResponse.deals
          ? deals.filter((d: Deal) => 
              parsedResponse.deals.includes(d.id))
          : undefined,
      };

      return NextResponse.json(chatResponse);
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json({
        text: "I understand your question, but I had trouble processing the response. Could you try asking in a different way?",
      });
    }
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { text: "I'm having trouble connecting right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}