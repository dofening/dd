import{f as e,p as t}from"./Texture-CuvQ_lcz.js";import{F as n}from"./GCManagedHash-CeWNwyv8.js";var r={name:`local-uniform-bit`,vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},i={...r,vertex:{...r.vertex,header:r.vertex.header.replace(`group(1)`,`group(2)`)}},a={name:`local-uniform-bit`,vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}},o={name:`texture-bit`,vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;


        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},s={name:`texture-bit`,vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}};function c(e,n){for(let r in e.attributes){let i=e.attributes[r],a=n[r];a?(i.format??(i.format=a.format),i.offset??(i.offset=a.offset),i.instance??(i.instance=a.instance)):t(`Attribute ${r} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}l(e)}function l(t){let{buffers:n,attributes:r}=t,i={},a={};for(let e in n){let t=n[e];i[t.uid]=0,a[t.uid]=0}for(let t in r){let n=r[t];i[n.buffer.uid]+=e(n.format).stride}for(let t in r){let n=r[t];n.stride??(n.stride=i[n.buffer.uid]),n.start??(n.start=a[n.buffer.uid]),a[n.buffer.uid]+=e(n.format).stride}}var u=[];u[n.NONE]=void 0,u[n.DISABLED]={stencilWriteMask:0,stencilReadMask:0},u[n.RENDERING_MASK_ADD]={stencilFront:{compare:`equal`,passOp:`increment-clamp`},stencilBack:{compare:`equal`,passOp:`increment-clamp`}},u[n.RENDERING_MASK_REMOVE]={stencilFront:{compare:`equal`,passOp:`decrement-clamp`},stencilBack:{compare:`equal`,passOp:`decrement-clamp`}},u[n.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:`equal`,passOp:`keep`},stencilBack:{compare:`equal`,passOp:`keep`}},u[n.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:`not-equal`,passOp:`keep`},stencilBack:{compare:`not-equal`,passOp:`keep`}};export{r as a,s as i,c as n,a as o,o as r,i as s,u as t};