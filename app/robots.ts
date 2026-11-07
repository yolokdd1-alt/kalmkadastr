export const dynamic='force-static';
import type {MetadataRoute} from 'next';
// Preview stays out of search until launch content and the final domain are approved.
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',disallow:'/'}}}
